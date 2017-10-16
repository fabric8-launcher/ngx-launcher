import { Component, Input } from '@angular/core';
import { Gui } from '../../../model/base.model';
import { InputComponent } from '../input.component';

@Component({
  selector: 'generic',
  templateUrl: 'test.page.html'
})
export class GenericPage extends InputComponent {
  @Input() gui: Gui;
}

