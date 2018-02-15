import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { MissionRuntimeService } from '../../app/launcher/launcher.module';
import { Mission } from '../../app/launcher/launcher.module';
import { Runtime } from '../../app/launcher/launcher.module';

import { CommonService } from '../../app/launcher/service/common.service';

@Injectable()
export class DemoMissionRuntimeService implements MissionRuntimeService {

  //TODO: remove the hardcodes
  private END_POINT: string = ''
  private API_BASE: string = 'booster-catalog/';
  private ORIGIN: string = '';

  constructor(private http: Http, private commonService: CommonService) {
    if (this.commonService) {
      this.END_POINT = this.commonService.getBackendUrl();
      this.ORIGIN = this.commonService.getOrigin();
    }
  }

  private get options(): RequestOptions {
    let headers = new Headers();
    headers.append('X-App', this.ORIGIN);
    headers.append('Authorization', 'Bearer ' + this.commonService.getAuthToken())
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
