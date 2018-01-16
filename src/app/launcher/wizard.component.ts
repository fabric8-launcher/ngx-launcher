import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.less']
})
export class WizardComponent {

  selectedSection: string;

  onInViewportChange($event: boolean, id: string) {
    if ($event) {
      this.selectedSection = id;
    }
  }

  // add this back by listening to child events
  // selectSection(id: string) {
  //   document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   this.selectedSection = id;
  // }
}
