import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { WizardComponent } from '../wizard.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-step-indicator',
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.less']
})
export class StepIndicatorComponent {

  constructor(@Host() public wizardComponent: WizardComponent) {
  }

  selectSection(id: string) {
    // TODO: dispatch event for scrolling, parent should also update selectedSection instead of doing it here
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    // this.wizardComponent.selectedSection = id;
  }
}
