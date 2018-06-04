import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { DependencyEditorService } from '../../app/launcher/launcher.module';

import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

@Injectable()
export class DemoDependencyEditorService implements DependencyEditorService {

  getBoosterInfo(missionId: string, runtimeId: string, runtimeVersion: string): Observable<any> {
    return Observable.of([]);
  }
}
