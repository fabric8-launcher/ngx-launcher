import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ReleaseStrategyStepComponent } from './release-strategy-step.component';


describe('ReleaseStrategyStepComponent', () => {
  let component: ReleaseStrategyStepComponent;
  let fixture: ComponentFixture<ReleaseStrategyStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        ReleaseStrategyStepComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseStrategyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
