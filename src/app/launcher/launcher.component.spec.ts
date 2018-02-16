import {
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LauncherComponent } from './launcher.component';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { ActivateBoosterComponent } from './activate-booster/activate-booster.component';
import { ProjectProgressComponent } from './project-progress/project-progress.component';
import { Selection } from './model/selection.model';
import { Summary } from './model/summary.model';
import { LauncherStep } from './launcher-step';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'f8launcher-step-indicator',
  template: ''
})
export class Fakef8launcherStepIndicator {
  @Input() inProgress: boolean 
}

@Component({
  selector: 'f8launcher-missionruntime-step',
  template: ''
})
export class Fakef8launcherMissionruntimeStep {
  @Input() id: string;
  @Input() completed: boolean = false;
  @Input() hidden: boolean = false;
  @Input() styleClass: string;
  @Input() title: string;
}

@Component({
  selector: 'f8launcher-targetenvironment-step',
  template: ''
})
export class Fakef8launcherTargetEnvironmentStep {
  @Input() id: string;
  @Input() completed: boolean = false;
  @Input() hidden: boolean = false;
  @Input() styleClass: string;
  @Input() title: string;
}

@Component({
  selector: 'f8launcher-releasestrategy-step',
  template: ''
})
export class Fakef8launcherReleaseStrategyStep {
  @Input() id: string;
  @Input() completed: boolean = false;
  @Input() hidden: boolean = false;
  @Input() styleClass: string;
  @Input() title: string;
}


@Component({
  selector: 'f8launcher-gitprovider-step',
  template: ''
})
export class Fakef8launcherGitproviderStep {
  @Input() id: string;
  @Input() completed: boolean = false;
  @Input() hidden: boolean = false;
  @Input() styleClass: string;
  @Input() title: string;
}

@Component({
  selector: 'f8launcher-projectsummary-step',
  template: ''
})
export class Fakef8launcherProjectSummaryrStep {
  @Input() id: string;
  @Input() completed: boolean = false;
  @Input() hidden: boolean = false;
  @Input() styleClass: string;
  @Input() title: string;
}

describe('LauncherComponent', () => {
  let component: LauncherComponent;
  let fixture: ComponentFixture<LauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        LauncherComponent,
        Fakef8launcherStepIndicator,
        Fakef8launcherMissionruntimeStep,
        Fakef8launcherTargetEnvironmentStep,
        Fakef8launcherReleaseStrategyStep,
        Fakef8launcherGitproviderStep,
        Fakef8launcherProjectSummaryrStep,
        ActivateBoosterComponent,
        ProjectProgressComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
