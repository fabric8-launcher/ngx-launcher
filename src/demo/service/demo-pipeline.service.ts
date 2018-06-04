import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Pipeline } from '../../app/launcher/model/pipeline.model';
import { PipelineService } from '../../app/launcher/service/pipeline.service';

import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

const MockPipeline = require('../../assets/mock/demo-pipeline.json');

@Injectable()
export class DemoPipelineService implements PipelineService {
  getPipelines(): Observable<Pipeline[]> {
    return Observable.of(MockPipeline);
  }
}
