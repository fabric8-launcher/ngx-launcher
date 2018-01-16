import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { MissionRuntimeStepComponent } from './mission-runtime-step.component';


describe('MissionRuntimeStepComponent', () => {
  let component: MissionRuntimeStepComponent;
  let fixture: ComponentFixture<MissionRuntimeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        MissionRuntimeStepComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionRuntimeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
