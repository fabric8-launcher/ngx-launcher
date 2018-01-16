import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { TargetEnvironmentStepComponent } from './target-environment-step.component';


describe('TargetEnvironmentStepComponent', () => {
  let component: TargetEnvironmentStepComponent;
  let fixture: ComponentFixture<TargetEnvironmentStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        TargetEnvironmentStepComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEnvironmentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
