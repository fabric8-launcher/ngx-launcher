import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import { ProjectSummaryStepComponent } from './project-summary-step.component';
import { DependencyCheckService } from '../service/dependency-check.service';
import { ProjectSummaryService } from '../service/project-summary.service';
import { Selection } from '../model/selection.model';
import { LauncherComponent } from '../launcher.component';
import { LauncherStep } from '../launcher-step';
import { Summary } from '../launcher.module';
import { DependencyCheck } from '../launcher.module';


let mockProjectSummaryService = {
  setup(summary: Summary): Observable<boolean>{
    return Observable.of(true);
  },
  verify(summary: Summary): Observable<boolean>{
    return Observable.of(true);
  }
}

let mockDependencyCheckService = {
  getDependencyCheck(): Observable<DependencyCheck>{
    return Observable.of({
      mavenArtifact: 'd4.345',
      groupId: '124-644',
      projectName: 'App_test_1',
      projectVersion: '124.554',
      spacePath: '/myspace'
    });
  }
}

export interface TypeWizardComponent{
  selectedSection: string,
  steps: LauncherStep[],
  summary: any,
  summaryCompleted: boolean,
  addStep(step: LauncherStep): void
};

let mockWizardComponent: TypeWizardComponent = {
  selectedSection: '',
  steps: [],
  summary: {
    dependencyCheck: {},
    gitHubDetails: {}
  },
  summaryCompleted:false,
  addStep(step: LauncherStep){
    for (let i = 0; i < this.steps.length; i++) {
      if (step.id === this.steps[i].id) {
        return;
      }
    }
    this.steps.push(step);
  }
}

describe('ProjectSummaryStepComponent', () => {
  let component: ProjectSummaryStepComponent;
  let fixture: ComponentFixture<ProjectSummaryStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterTestingModule,
        InViewportModule
      ],
      declarations: [
        ProjectSummaryStepComponent
      ],
      providers : [
        {
          provide: ProjectSummaryService, useValue: mockProjectSummaryService
        },
        {
          provide: DependencyCheckService, useValue: mockDependencyCheckService
        },
        {
          provide: LauncherComponent, useValue: mockWizardComponent
        },
        { 
          provide: WindowRef, useValue: window 
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSummaryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
