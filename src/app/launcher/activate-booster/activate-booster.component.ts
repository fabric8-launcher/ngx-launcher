import {
  Component,
  Host,
  ViewEncapsulation
} from '@angular/core';
import { LauncherComponent } from '../launcher.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-activatebooster',
  templateUrl: './activate-booster.component.html',
  styleUrls: ['./activate-booster.component.less']
})
export class ActivateBoosterComponent {

  constructor(@Host() public launcherComponent: LauncherComponent) {
  }
}
