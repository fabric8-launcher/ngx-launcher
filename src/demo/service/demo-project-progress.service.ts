import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription, Subject } from 'rxjs';

import { Progress } from '../../app/launcher/launcher.module';
import { ProjectProgressService } from '../../app/launcher/launcher.module';
import { HelperService } from '../../app/launcher/service/helper.service';
import { TokenProvider } from '../../app/service/token-provider';

@Injectable()
export class DemoProjectProgressService implements ProjectProgressService {
  progressMessages = new Subject<MessageEvent>();
  private socket: WebSocket;
  private END_POINT: string = '';

  constructor(private helperService: HelperService,
    private tokenProvider: TokenProvider) {
    if (this.helperService) {
      this.END_POINT = this.helperService.getBackendUrl();
      this.END_POINT = this.END_POINT.split('/api')[0];
    }
  }

  getProgress(uuidLink: string): WebSocket {
    this.socket = new WebSocket(this.END_POINT + uuidLink);
    this.socket.onmessage = (event: MessageEvent) => {
      this.progressMessages.next(event);
    };
    this.socket.onerror = (error: ErrorEvent) => {
      this.progressMessages.error(error);
    };
    this.socket.onclose = () => {
      this.progressMessages.complete();
    };
    return this.socket;
  }
}
