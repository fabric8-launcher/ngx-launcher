import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Pipeline } from '../../app/launcher/model/pipeline.model';
import { PipelineService } from '../../app/launcher/service/pipeline.service';

@Injectable()
export class DemoPipelineService implements PipelineService {

    //TODO: remove the hardcodes
    private END_POINT: string = 'https://forge.api.prod-preview.openshift.io';
    private API_BASE: string = '/api/services/jenkins/pipelines';
    private ORIGIN: string = 'osio';
  
    constructor(private http: Http) {
    }
  
    private get options(): RequestOptions {
      let headers = new Headers();
      headers.append('X-App', this.ORIGIN);
      return new RequestOptions({
          headers: headers
      })
    }
  
    getPipelines(): Observable<Pipeline[]> {
      let runtimeEndPoint: string = this.END_POINT + this.API_BASE;
      return this.http.get(runtimeEndPoint, this.options)
                   .map(response => response.json() as Pipeline[])
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
