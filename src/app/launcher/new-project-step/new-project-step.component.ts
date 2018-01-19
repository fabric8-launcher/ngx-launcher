import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { WizardComponent } from '../wizard.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-newproject-step',
  templateUrl: './new-project-step.component.html',
  styleUrls: ['./new-project-step.component.less']
})
export class NewProjectStepComponent {

  constructor(@Host() public wizardComponent: WizardComponent) {
  }
}
