import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ProjectSummaryStepComponent } from './project-summary-step.component';


describe('ProjectSummaryStepComponent', () => {
  let component: ProjectSummaryStepComponent;
  let fixture: ComponentFixture<ProjectSummaryStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        ProjectSummaryStepComponent
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
