import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { WizardComponent } from './wizard.component';
import { InViewportModule } from '@thisissoon/angular-inviewport';


@NgModule({
  imports: [
    CommonModule,
    InViewportModule
  ],
  exports: [
    StepIndicatorComponent,
    WizardComponent
  ],
  declarations: [
    StepIndicatorComponent,
    WizardComponent
  ]
})
export class LauncherModule {
  constructor() {}
}
