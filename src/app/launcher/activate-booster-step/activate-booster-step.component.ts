import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { WizardComponent } from '../wizard.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-activatebooster-step',
  templateUrl: './activate-booster-step.component.html',
  styleUrls: ['./activate-booster-step.component.less']
})
export class ActivateBoosterStepComponent {

  constructor(@Host() public wizardComponent: WizardComponent) {
  }
}
