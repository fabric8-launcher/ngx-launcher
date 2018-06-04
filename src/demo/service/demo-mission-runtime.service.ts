import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { MissionRuntimeService, Cluster } from '../../app/launcher/launcher.module';
import { Mission } from '../../app/launcher/launcher.module';
import { Runtime } from '../../app/launcher/launcher.module';

import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

const MockData = require('../../assets/mock/demo-mission-runtime.json')

@Injectable()
export class DemoMissionRuntimeService implements MissionRuntimeService {

  getMissions(): Observable<Mission[]> {
    return Observable.of(MockData.missions);
  }

  getRuntimes(): Observable<Runtime[]> {
    return Observable.of(MockData.runtimes);
  }
}
