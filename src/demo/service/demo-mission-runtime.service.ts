import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { MissionRuntimeService } from '../../app/launcher/launcher.module';
import { Mission } from '../../app/launcher/launcher.module';
import { Runtime } from '../../app/launcher/launcher.module';

import { Config } from '../../app/service/config.component';

@Injectable()
export class DemoMissionRuntimeService implements MissionRuntimeService {

    //TODO: remove the hardcodes
    private END_POINT: string = ''
    private API_BASE: string = 'booster-catalog/';
    private ORIGIN: string = 'osio';

  constructor(private http: Http, private config: Config) {
    this.END_POINT = this.config && this.config.get('backend_url');
  }

  private get options(): RequestOptions {
    let headers = new Headers();
    headers.append('X-App', this.ORIGIN);
    return new RequestOptions({
        headers: headers
    })
  }

  getMissions(): Observable<Mission[]> {
    let missionEndPoint: string = this.END_POINT + this.API_BASE + 'missions';
    return this.http.get(missionEndPoint, this.options)
                 .map(response => response.json() as Mission[])
                 .catch(this.handleError);
  }

  getRuntimes(): Observable<Runtime[]> {
    let runtimeEndPoint: string = this.END_POINT + this.API_BASE + 'runtimes';
    return this.http.get(runtimeEndPoint, this.options)
                 .map(response => response.json() as Runtime[])
                 .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
