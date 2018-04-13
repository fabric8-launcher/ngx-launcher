import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription, Subject } from 'rxjs';

import { Progress } from '../../app/launcher/launcher.module';
import { ProjectProgressService } from '../../app/launcher/launcher.module';
import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

@Injectable()
export class DemoProjectProgressService implements ProjectProgressService {
  private END_POINT: string = '';

  constructor(private helperService: HelperService,
    private tokenProvider: TokenProvider) {
    if (this.helperService) {
      this.END_POINT = this.helperService.getBackendUrl();
      this.END_POINT = this.END_POINT.split('/api')[0];
      if (this.END_POINT.indexOf('https') !== -1) {
        this.END_POINT = this.END_POINT.replace('https', 'wss');
      } else if (this.END_POINT.indexOf('http') !== -1) {
        this.END_POINT = this.END_POINT.replace('http', 'ws');
      }
    }
  }

  getProgress(uuidLink: string): WebSocket {
    const socket = new WebSocket(this.END_POINT + uuidLink);
    return socket;
  }
}
