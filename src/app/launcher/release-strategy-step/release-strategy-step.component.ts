import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { WizardComponent } from '../wizard.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-releasestrategy-step',
  templateUrl: './release-strategy-step.component.html',
  styleUrls: ['./release-strategy-step.component.less']
})
export class ReleaseStrategyStepComponent {

  constructor(@Host() public wizardComponent: WizardComponent) {
  }
}
