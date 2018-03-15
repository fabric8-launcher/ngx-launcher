import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import { PopoverModule } from 'ngx-bootstrap';
import { PipeModule } from 'patternfly-ng';

import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { MissionRuntimeCreateappStepComponent } from './mission-runtime-createapp-step.component';
import { MissionRuntimeService } from '../../service/mission-runtime.service';
import { Mission } from '../../model/mission.model';
import { Runtime } from '../../model/runtime.model';

let mockMissionRuntimeService = {
  getMissions(): Observable<Mission[]> {
    let missions = Observable.of( [{
      id: 'crud',
      name: 'CRUD',
      suggested: true,
      prerequisite: 'prerequisite text',
      description : 'sample desp',
      runtimes: [
      'vert.x',
      'nodejs',
      'spring-boot',
      'wildfly-swarm'
      ]
      }]);
      return missions;
  },
  getRuntimes(): Observable<Runtime[]> {
    let runtimes = Observable.of( [<Runtime> {
      'id': 'vert.x',
      'name': 'Eclipse Vert.x',
      'suggested': true,
      'prerequisite': 'prerequisite text',
      'description': 'Brief description of the technology...',
      /* stylelint-disable */
      'icon': "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 280'%3E%3Cpath fill='%23022B37' d='M107 170.8L67.7 72H46.9L100 204h13.9L167 72h-20.4zm64 33.2h80v-20h-61v-37h60v-19h-60V91h61V72h-80zm180.1-90.7c0-21-14.4-42.3-43.1-42.3h-48v133h19V91h29.1c16.1 0 24 11.1 24 22.4 0 11.5-7.9 22.6-24 22.6H286v9.6l48 58.4h24.7L317 154c22.6-4 34.1-22 34.1-40.7m56.4 90.7v-1c0-6 1.7-11.7 4.5-16.6V91h39V71h-99v20h41v113h14.5z'/%3E%3Cpath fill='%23623C94' d='M458 203c0-9.9-8.1-18-18-18s-18 8.1-18 18 8.1 18 18 18 18-8.1 18-18M577.4 72h-23.2l-27.5 37.8L499.1 72h-40.4c12.1 16 33.6 46.8 47.8 66.3l-37 50.9c2 4.2 3.1 8.9 3.1 13.8v1H499l95.2-132h-16.8zm-19.7 81.5l-20.1 27.9 16.5 22.6h40.2c-9.6-13.7-24-33.3-36.6-50.5z'/%3E%3C/svg%3E",
      /* stylelint-enable */
      'projectVersion': 'v1.0.0',
      'missions': [
        {
          'id': 'crud',
          'versions': [
            {
              'id': 'community',
              'name': '3.5.0.Final (Community)'
            }
          ]
        }]
    }]);
    return runtimes;
  }
};

export interface TypeWizardComponent {
  selectedSection: string;
  steps: LauncherStep[];
  summary: any;
  summaryCompleted: boolean;
  addStep(step: LauncherStep): void;
  onInViewportChange($event: any, id: string): any;
}

let mockWizardComponent: TypeWizardComponent = {
  selectedSection: '',
  steps: [],
  summary: {
    dependencyCheck: {},
    gitHubDetails: {}
  },
  summaryCompleted: false,
  addStep(step: LauncherStep) {
      for (let i = 0; i < this.steps.length; i++) {
        if (step.id === this.steps[i].id) {
          return;
        }
      }
      this.steps.push(step);
  },
  onInViewportChange($event: any, id: string) {
    if ($event) {
      setTimeout(() => {
        this.selectedSection = id;
      }, 10); // Avoids ExpressionChangedAfterItHasBeenCheckedError
    }
  }
};

describe('MissionRuntimeStepComponent', () => {
  let component: MissionRuntimeCreateappStepComponent;
  let fixture: ComponentFixture<MissionRuntimeCreateappStepComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        InViewportModule,
        PipeModule,
        PopoverModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [
        MissionRuntimeCreateappStepComponent
      ],
      providers: [
        {
          provide: MissionRuntimeService, useValue: mockMissionRuntimeService
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
    fixture = TestBed.createComponent(MissionRuntimeCreateappStepComponent);
    component = fixture.componentInstance;
    // component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Missions tests

  it('to have count of missions to be 1', () => {
    let missionsList = component.missions;
    expect(missionsList.length).toBe(1);
  });

  it('should have 1 entry for mission created', () => {
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    expect(missionsSection.children.length).toBe(1);
  });

  it('should have the class selected-list-item added to the list group item on click of radio button of mission', fakeAsync(() => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let missionGroupItem = missionsSection.querySelector('.list-group-item');
    let radioBtn = <HTMLInputElement>missionGroupItem.querySelector('input[type="radio"]');
    let beforeChange = missionGroupItem.classList.contains('selected-list-item');
    radioBtn.click();
    tick();
    fixture.detectChanges();
    expect(beforeChange === false && missionGroupItem.classList.contains('selected-list-item') === true).toBeTruthy();
  }));

  it('should update the selected mission in launcher component', fakeAsync(() => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let missionGroupItem = missionsSection.querySelector('.list-group-item');
    let radioBtn = <HTMLInputElement>missionGroupItem.querySelector('input[type="radio"]');
    let beforeChange = missionGroupItem.classList.contains('selected-list-item');
    radioBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.launcherComponent.summary.mission).toBe(component.missions[0]);
  }));

  it('should have the suggested missions tag when mission.suggested field is true', () => {
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let featuredTag = missionsSection.querySelector('.f8launcher-tags-label.suggested-tag');
    expect(featuredTag).toBeDefined();
  });

  it('should not have the suggested missions tag when mission.suggested field is false', () => {
    component.missions[0].suggested = false;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let featuredTag = missionsSection.querySelector('.f8launcher-tags-label.suggested-tag');
    expect(featuredTag).toBeNull();
  });

  it('should have the prerequisite missions tag when mission.prerequisite field is present', () => {
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let featuredTag = missionsSection.querySelector('.f8launcher-tags-label.prerequisite');
    expect(featuredTag).toBeDefined();
  });

  it('should not have the prerequisite missions tag when mission.prerequisite field is absent', () => {
    delete component.missions[0].prerequisite;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let featuredTag = missionsSection.querySelector('.f8launcher-tags-label.prerequisite');
    expect(featuredTag).toBeNull();
  });



  // it('should have the contribute missions tag when mission is enabled', () => {
  //   element = fixture.nativeElement;
  //   let missionsSection = element.querySelectorAll('.card-pf-body')[0];
  //   let featuredTag = missionsSection.querySelector('.f8launcher-tags-label.contribute');
  //   expect(featuredTag).toBeDefined();
  // });

  // it('should not have the contribute missions tag when mission is disabled', () => {
  //   delete component.missions[0].contribute;
  //   fixture.detectChanges();
  //   element = fixture.nativeElement;
  //   let missionsSection = element.querySelectorAll('.card-pf-body')[0];
  //   let featuredTag = missionsSection.querySelector('.f8launcher-tags-label.contribute');
  //   expect(featuredTag).toBeNull();
  // });

  it('should have the mission name as specified', () => {
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let missionHead = missionsSection.querySelectorAll('.list-group-item-heading');
    let missions = component.missions, len = missions.length;
    for (let i = 0; i < len; ++ i) {
      expect((<HTMLDivElement>missionHead[i]).innerText).toBe(missions[i].name);
    }
  });

  it('should have the mission description as specified', () => {
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let missionHead = missionsSection.querySelectorAll('.list-group-item-text');
    let missions = component.missions, len = missions.length;
    for (let i = 0; i < len; ++ i) {
      expect((<HTMLDivElement>missionHead[i].children[0]).innerText).toBe(missions[i].description);
    }
  });

  it('should have the mission description truncated if the length is beyond 45 characters', () => {
    let desc: string = 'this is a very lengthy description just to check the functionality of truncation';
    component.missions[0].description = desc;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let missionHead = missionsSection.querySelectorAll('.list-group-item-text');
    let missions = component.missions, len = missions.length;
    for (let i = 0; i < len; ++ i) {
      expect((<HTMLDivElement>missionHead[i].children[0]).innerText).toBe(desc.substr(0, 45) + '...');
    }
  });

  it('should show "Less" if the showMore is true - Missions', () => {
    component.missions[0]['showMore'] = true;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let showMore = <HTMLAnchorElement>missionsSection.querySelector('.description-more').children[0];
    expect(showMore.innerText).toBe('Less');
  });

  it('should show "More" if the showMore is false - Missions', () => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let showMore = <HTMLAnchorElement>missionsSection.querySelector('.description-more').children[0];
    expect(showMore.innerText).toBe('More');
  });

  it('should disable the runtimes, on click of mission, which aren\'t applicable', fakeAsync(() => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let missionsSection = element.querySelectorAll('.card-pf-body')[0];
    let missionGroupItem = missionsSection.querySelector('.list-group-item');
    let radioBtn = <HTMLInputElement>missionGroupItem.querySelector('input[type="radio"]');
    let beforeChange = missionGroupItem.classList.contains('selected-list-item');
    radioBtn.click();
    tick();
    fixture.detectChanges();
    component.launcherComponent.summary.mission.runtimes.splice(0, 1);
    fixture.detectChanges();
    let selectedMission = component.launcherComponent.summary.mission;
    expect(component.isRuntimeDisabled(component.runtimes[0])).toBeTruthy();
  }));



  // Runtimes tests

  it('to have count of runtimes to be 1', () => {
    let runtimesList = component.runtimes;
    expect(runtimesList.length).toBe(1);
  });

  it('should have 1 entry for runtimes created', () => {
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    expect(runtimesSection.children.length).toBe(1);
  });

  it('should have the class selected-list-item added to the list group item on click of radio button of runtime', fakeAsync(() => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let runtimeGroupItem = runtimesSection.querySelector('.list-group-item');
    let radioBtn = <HTMLInputElement>runtimeGroupItem.querySelector('input[type="radio"]');
    let beforeChange = runtimeGroupItem.classList.contains('selected-list-item');
    radioBtn.click();
    tick();
    fixture.detectChanges();
    expect(beforeChange === false && runtimeGroupItem.classList.contains('selected-list-item') === true).toBeTruthy();
  }));

  it('should update the selected runtime in launcher component', fakeAsync(() => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let runtimeGroupItem = runtimesSection.querySelector('.list-group-item');
    let radioBtn = <HTMLInputElement>runtimeGroupItem.querySelector('input[type="radio"]');
    let beforeChange = runtimeGroupItem.classList.contains('selected-list-item');
    radioBtn.click();
    tick();
    fixture.detectChanges();
    expect(component.launcherComponent.summary.runtime).toBe(component.runtimes[0]);
  }));

  it('should have the suggested runtimes tag when runtime.suggested field is true', () => {
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let featuredTag = runtimesSection.querySelector('.f8launcher-tags-label.suggested-tag');
    expect(featuredTag).toBeDefined();
  });

  it('should not have the suggested runtimes tag when runtime.suggested field is false', () => {
    component.runtimes[0].suggested = false;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let featuredTag = runtimesSection.querySelector('.f8launcher-tags-label.suggested-tag');
    expect(featuredTag).toBeNull();
  });

  it('should have the prerequisite runtimes tag when runtime.prerequisite field is present', () => {
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let featuredTag = runtimesSection.querySelector('.f8launcher-tags-label.prerequisite');
    expect(featuredTag).toBeDefined();
  });

  it('should not have the prerequisite runtimes tag when runtime.prerequisite field is absent', () => {
    delete component.runtimes[0].prerequisite;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let featuredTag = runtimesSection.querySelector('.f8launcher-tags-label.prerequisite');
    expect(featuredTag).toBeNull();
  });

  // it('should have the contribute runtimes tag when runtime.contribute field is present', () => {
  //   element = fixture.nativeElement;
  //   let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
  //   let featuredTag = runtimesSection.querySelector('.f8launcher-tags-label.contribute');
  //   expect(featuredTag).toBeDefined();
  // });

  // it('should not have the contribute runtimes tag when runtime.contribute field is absent', () => {
  //   delete component.runtimes[0].contribute;
  //   fixture.detectChanges();
  //   element = fixture.nativeElement;
  //   let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
  //   let featuredTag = runtimesSection.querySelector('.f8launcher-tags-label.contribute');
  //   expect(featuredTag).toBeNull();
  // });

  it('should have the runtime name as specified', () => {
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let runtimesHead = runtimesSection.querySelectorAll('.list-group-item-heading');
    let runtimes = component.runtimes, len = runtimes.length;
    for (let i = 0; i < len; ++ i) {
      expect((<HTMLDivElement>runtimesHead[i]).childNodes[0].textContent.trim()).toBe(runtimes[i].name);
    }
  });

  it('should have the runtime description as specified', () => {
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let runtimesHead = runtimesSection.querySelectorAll('.list-group-item-text');
    let runtimes = component.runtimes, len = runtimes.length;
    for (let i = 0; i < len; ++ i) {
      expect((<HTMLDivElement>runtimesHead[i].children[0]).innerText).toBe(runtimes[i].description);
    }
  });

  it('should have the runtime description truncated if the length is beyond 45 characters', () => {
    let desc: string = 'this is a very lengthy description just to check the functionality of truncation';
    component.runtimes[0].description = desc;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let runtimesHead = runtimesSection.querySelectorAll('.list-group-item-text');
    let runtimes = component.runtimes, len = runtimes.length;
    for (let i = 0; i < len; ++ i) {
      expect((<HTMLDivElement>runtimesHead[i].children[0]).innerText).toBe(desc.substr(0, 45) + '...');
    }
  });

  it('should show "Less" if the showMore is true - Runtimes', () => {
    component.runtimes[0]['showMore'] = true;
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let showMore = <HTMLAnchorElement>runtimesSection.querySelector('.description-more').children[0];
    expect(showMore.innerText).toBe('Less');
  });

  it('should show "More" if the showMore is false - Runtimes', () => {
    fixture.detectChanges();
    element = fixture.nativeElement;
    let runtimesSection = element.querySelectorAll('.card-pf-body')[1];
    let showMore = <HTMLAnchorElement>runtimesSection.querySelector('.description-more').children[0];
    expect(showMore.innerText).toBe('More');
  });
});
