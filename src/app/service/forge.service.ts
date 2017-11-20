import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/scan';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { Gui, StatusResult, Version } from '../model/base.model';
import { History } from './history.component';
import { Config } from './config.component';
import { TokenProvider } from './token-provider';

@Injectable()
export class ForgeService {
  public filters: string;
  private apiUrl: string;

  constructor(protected http: Http, protected config: Config, protected tokenProvider: TokenProvider) {
    this.apiUrl = config.get('backend_url');
  }

  version(additionalHeaders: Headers = new Headers()): Promise<Version> {
    return this.options.then(options => {
      return this.http.get(`${this.apiUrl}/version`, this.merge(options, additionalHeaders)).toPromise()
        .then(response => response.json() as Version)
        .catch(this.handleError);
    });
  }

  commandInfo(command: string, additionalHeaders: Headers = new Headers()): Promise<Gui> {
    return this.options.then(options => {
      return this.http.get(`${this.apiUrl}/commands/${command}`, this.merge(options, additionalHeaders))
        .retryWhen(errors => errors.delay(3000).scan((acc, source, index) => {
          if (index) throw source;
        })).toPromise()
        .then(response => response.json() as Gui)
        .catch(this.handleError);
    });
  }

  validate(command: string, history: History): Promise<Gui> {
    return this.post(history.convert(), `/commands/${command}/validate`);
  }

  nextStep(command: string, history: History): Promise<Gui> {
    return this.post(history.convert(history.stepIndex), `/commands/${command}/next`);
  }

  executeStep(command: string, history: History): Promise<Gui> {
    return this.post(history.convert(history.stepIndex), `/commands/${command}/execute`);
  }

  action(gui: Gui): Promise<Gui> {
    return this.post(gui, 'action');
  }

  loadGui(command: string, history: History): Promise<Gui> {
    if (history.stepIndex === 0) {
      return this.commandInfo(command);
    } else {
      return this.nextStep(command, history);
    }
  }

  upload(command: string, history: History, additionalHeaders: Headers = new Headers()): Promise<StatusResult> {
    return this.options.then(options => {
      return this.http.post(`${this.apiUrl}/commands/${command}/missioncontrol`,
        history.convert(), this.merge(options, additionalHeaders)).toPromise()
        .then(response => response.json() as StatusResult)
        .catch(this.handleError);
    });
  }

  downloadZip(command: string, history: History) {
    let form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', `${this.apiUrl}/commands/${command}/zip`);

    form.appendChild(this.createFormInput('stepIndex', String(history.stepIndex)));

    for (let i = 1; i <= history.stepIndex; i++) {
      let inputs = history.get(i).inputs;
      if (inputs) {
        for (let input of inputs) {
          if (input.value instanceof Array) {
            for (let value of input.value) {
              form.appendChild(this.createFormInput(input.name, value));
            }
          } else {
            form.appendChild(this.createFormInput(input.name, input.value));
          }
        }
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  private merge(options: RequestOptionsArgs, headers: Headers): RequestOptionsArgs {
    headers.forEach((value, name) => {
      options.headers.append(name, value[0]);
    });
    return options;
  }

  private createFormInput(name: string, value: string): HTMLElement {
    let element = document.createElement('input');
    element.setAttribute('type', 'hidden');
    element.setAttribute('name', name);
    element.setAttribute('value', value);
    return element;
  }

  private post(submittableGui: Gui, action: string, additionalHeaders: Headers = new Headers()): Promise<Gui> {
    return this.options.then(options => {
      return this.http.post(this.apiUrl + action, submittableGui, this.merge(options, additionalHeaders))
        .retryWhen(errors => errors.delay(3000).scan((acc, source, index) => {
          if (index) throw source;
        })).toPromise()
        .then(response => response.json() as Gui)
        .catch(this.handleError);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    if (error.statusText) {
      return Promise.reject(error.json());
    }
    return Promise.reject(error.message || 'Error calling service');
  }

  protected get options(): Promise<RequestOptionsArgs> {
    let headers = new Headers();
    if (this.filters) {
      headers.append('X-LAUNCHPAD_BACKEND_LABEL_FILTERS', this.filters);
    }
    return this.tokenProvider.token.then(token => {
      headers.append('Authorization', 'Bearer ' + token);
      return {
        headers: headers
      };
    });
  }
}
