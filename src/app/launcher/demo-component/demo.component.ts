import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-component',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {

  @Input() testValue: string;
  selectedSection: string;

  onInViewportChange($event: boolean, id: string) {
    if ($event) {
      this.selectedSection = id;
    }
  }

  selectSection(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.selectedSection = id;
  }
}
