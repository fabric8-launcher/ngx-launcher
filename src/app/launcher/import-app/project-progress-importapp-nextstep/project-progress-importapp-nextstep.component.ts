import {
  Component,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Progress } from '../../model/progress.model';
import { ProjectProgressService } from '../../service/project-progress.service';
import { LauncherComponent } from '../../launcher.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-projectprogress-importapp-nextstep',
  templateUrl: './project-progress-importapp-nextstep.component.html',
  styleUrls: ['./project-progress-importapp-nextstep.component.less']
})
export class ProjectProgressImportappNextstepComponent implements OnInit, OnChanges, OnDestroy {
  @Input() statusLink: string;
  private _progress: Progress[];
  private subscriptions: Subscription[] = [];
  private socket: WebSocket;

  constructor(@Host() public launcherComponent: LauncherComponent,
              private projectProgressService: ProjectProgressService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const statusLink = changes['statusLink']['currentValue'];
    if (statusLink) {
      // for now i have commented this
      // this.socket = this.projectProgressService.getProgress(statusLink);
    }
  }

  ngOnDestroy() {
    this.closeConnections();
  }

  // Accessors

  get allCompleted(): boolean {
    if (this._progress === undefined) {
      return false;
    }
    let result = true;
    for (let i = 0; i < this._progress.length; i++) {
      if (this._progress[i].completed !== true) {
        result = false;
        break;
      }
    }
    return result;
  }

  get progress(): Progress[] {
    return this._progress;
  }

  private closeConnections() {
    this.socket.close();
  }
}
