import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-component',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {

  @Input() testValue: string;
}
