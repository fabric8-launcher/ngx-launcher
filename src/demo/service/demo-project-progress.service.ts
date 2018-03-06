import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription, Subject } from 'rxjs';

import { Progress } from '../../app/launcher/launcher.module';
import { ProjectProgressService } from '../../app/launcher/launcher.module';
import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

@Injectable()
export class DemoProjectProgressService implements ProjectProgressService {
  statusMessages = new Subject<any>();
  private progress: Progress[];
  private _progressSubject: Subject<Progress[]> = new Subject();
  private timer: Subscription;
  private socket: Subject<MessageEvent>;
  private END_POINT: string = '';
  private ORIGIN: string = '';
  private TOKEN: string = '';
  private ws: WebSocket;

  constructor(private helperService: HelperService,
    private tokenProvider: TokenProvider) {
    if (this.helperService) {
      this.END_POINT = this.helperService.getBackendUrl();
      console.log(this.END_POINT);
      this.END_POINT = 'wss://forge.api.prod-preview.openshift.io';
      this.ORIGIN = this.helperService.getOrigin();
      this.tokenProvider.token.then((token) => {
        this.TOKEN = token;
      });
    }
  }

  getProgress(uuidLink: string): Observable<Progress[]> {
    console.log(uuidLink);
    this.initTimer(); // Timer to simulate progress
    return this._progressSubject.asObservable();
  }

  connect(uuidLink: string) {
    this.ws = new WebSocket(this.END_POINT + uuidLink);
    this.ws.onmessage = (event: MessageEvent) => {
      let data = JSON.parse(event.data);
      this.statusMessages.next(data);
    };
    this.ws.onerror = (error: MessageEvent) => {
      this.statusMessages.error(error);
    };
  }

  connectt(uuidLink: string): Subject<MessageEvent> {
    let progressEndPoint: string = this.END_POINT + uuidLink;
    if (!this.socket) {
      this.socket = this.create(progressEndPoint);
    }
    return this.socket;
  }

  // Private
  private create(url: string): Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      }
    };
    return Subject.create(observer, observable);
  }

  private getItems(): Progress[] {
    if (this.progress === undefined) {
      this.progress = [{
        'completed': false,
        'description': 'Creating New GitHub Repository',
        'hypertext': 'View New Repository',
        'inProgress': false,
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
      }, {
        'completed': false,
        'description': 'Pushing Customized Booster Code into the Repository',
        'inProgress': false
      }, {
        'completed': false,
        'description': 'Creating Your Project on the OpenShift Cloud',
        'inProgress': false,
        'hypertext': 'View New Application',
        'url': 'https://github.com/fabric8-launcher/ngx-launcher'
      }, {
        'completed': false,
        'description': 'Setting up Build Pipeline',
        'inProgress': false
      }, {
        'completed': false,
        'description': 'Configure Trigger Builds on Git Pushes',
        'inProgress': false
      }] as Progress[];
    }
    return this.progress;
  }

  // Timer to simulate progress
  private initTimer(): void {
    if (this.timer !== undefined) {
      this.timer.unsubscribe();
    }
    this.timer = Observable
      .timer(0, 2500) // timer(firstValueDelay, intervalBetweenValues)
      .do(() => {
        let items = this.getItems();
        for (let i = 0; i < items.length; i++) {
          if (items[i].inProgress === true) {
            items[i].inProgress = false;
            items[i].completed = true;
          } else if (items[i].completed === true) {
            items[i].inProgress = false;
          } else if (items[i].completed === false) {
            items[i].inProgress = true;
            break;
          }
        }
      })
      .take(6)
      .subscribe(value => {
        this.updateProgressStream();
      });
  }

  private updateProgressStream(): void {
    this._progressSubject.next(this.getItems());
  }
}
