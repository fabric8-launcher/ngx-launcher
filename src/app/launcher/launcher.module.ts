import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo-component/demo.component';


@NgModule({
  imports: [CommonModule],
  exports: [
  ],
  declarations: [
    DemoComponent
  ]
})
export class LauncherModule {
  constructor() {}
}
