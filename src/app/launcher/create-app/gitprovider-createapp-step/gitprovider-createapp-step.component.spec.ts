import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

import { PopoverModule } from 'ngx-bootstrap';
import { PipeModule } from 'patternfly-ng/pipe';

import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';

import { GitproviderCreateappStepComponent } from './gitprovider-createapp-step.component';
import { GitProviderService } from '../../service/git-provider.service';

import { GitHubDetails } from '../../model/github-details.model';

let mockGitProviderService = {
  connectGitHubAccount(redirectUrl: string): void {
    let url = 'https://github.com/login/oauth/authorize?client_id=' + this.clientId +
    '&redirect_uri=' + encodeURIComponent(redirectUrl);
  },
  getGitHubDetails(): Observable<GitHubDetails> {
    let gitHubDetails = Observable.of( <GitHubDetails>{
      authenticated: true,
      avatar: 'https://avatars3.githubusercontent.com/u/17882357?v=4',
      login: 'testuser',
      organizations: ['fabric-ui'],
      htmlUrl: 'https://github.com/testuser',
      url: 'https://api.github.com/users/testuser',
      description: [],
      visibility: 'false'
    });
    return gitHubDetails;
  },
  isGitHubRepo(org: string, repoName: string): Observable<boolean> {
    let gitHubRepo = Observable.of(true);
    return gitHubRepo;
  },
  getGitHubRepoList(org: string): Observable<any> {
    let gitHubRepoList = Observable.of(['fabric8-ui']);
    return gitHubRepoList;
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

describe('GitProviderStepComponent', () => {
  let component: GitproviderCreateappStepComponent;
  let fixture: ComponentFixture<GitproviderCreateappStepComponent>;

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
        GitproviderCreateappStepComponent
      ],
      providers: [
        {
          provide: GitProviderService, useValue: mockGitProviderService
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
    fixture = TestBed.createComponent(GitproviderCreateappStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
