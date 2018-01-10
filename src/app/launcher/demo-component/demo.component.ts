import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-component',
  templateUrl: './demo.component.html',
  styles: []
})
export class DemoComponent {

  @Input() testValue: string;
}
