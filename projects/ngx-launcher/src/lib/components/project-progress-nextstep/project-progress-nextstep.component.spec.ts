import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, Subject } from 'rxjs';

import { Broadcaster } from 'ngx-base';
import { LauncherComponent } from '../../launcher.component';
import { Progress } from '../../model/progress.model';
import { Projectile } from '../../model/projectile.model';
import { ProjectProgressService } from '../../service/project-progress.service';
import { ProjectSummaryService } from '../../service/project-summary.service';
import { ButtonNextStepComponent } from '../../shared/button-next-step.component';
import { BroadcasterTestProvider } from '../targetenvironment-step/target-environment-step.component.spec';
import { ProjectProgressNextstepComponent } from './project-progress-nextstep.component';

const progressSubject: Subject<Progress[]> = new Subject();
const mockProjectProgressService = {
  getProgress(): Observable<Progress[]> {
    return progressSubject.asObservable();
  }
};

export interface TypeWizardComponent {
  completed(): any;
}

const mockWizardComponent: TypeWizardComponent = {
  completed() {
    // this.onComplete.emit();
  }
};

const mockProjectSummaryService = {
  setup(): Observable<boolean> {
    return of(true);
  }
};

describe('ProjectProgressComponent', () => {
  let component: ProjectProgressNextstepComponent;
  let fixture: ComponentFixture<ProjectProgressNextstepComponent>;
  let launcherComponent: LauncherComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule
      ],
      declarations: [
        ProjectProgressNextstepComponent,
        ButtonNextStepComponent
      ],
      providers: [
        Projectile,
        { provide: Broadcaster, useValue: BroadcasterTestProvider.broadcaster },
        {
          provide: LauncherComponent, useValue: mockWizardComponent
        },
        {
          provide: ProjectSummaryService, useValue: mockProjectSummaryService
        },
        {
          provide: ProjectProgressService, useValue: mockProjectProgressService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressNextstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnChanges', () => {
    const input: any = {
      statusLink: {
        currentValue: 'currentValue'
      }
    };
    spyOn(component, 'ngOnChanges');
    component.ngOnChanges(input);
    expect(component.ngOnChanges).toHaveBeenCalledWith(input);
  });

  it('View pipeline button should not be visible if nextbuttons value is false', () => {
    fixture.detectChanges();
    const viewPipelineButton: HTMLElement = fixture.nativeElement.querySelector('.f8launcher-viewpipeline');
    expect(viewPipelineButton).toBeFalsy();
  });

  it('Edit Application in Web IDE button should not be visible if nextbuttons value is false', () => {
    fixture.detectChanges();
    const openIDEButton: HTMLElement = fixture.nativeElement.querySelector('.f8launcher-openIDE');
    expect(openIDEButton).toBeFalsy();
  });
});
