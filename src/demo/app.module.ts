// import './rxjs-extensions';

import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Main areas
import { WelcomeComponent } from './components/welcome.component';

import { DemoDependencyCheckService } from './service/demo-dependency-check.service';
import { DemoGitProviderService } from './service/demo-git-provider.service';
import { DemoMissionRuntimeService } from './service/demo-mission-runtime.service';
import { DemoPipelineService } from './service/demo-pipeline.service';
import { DemoProjectProgressService } from './service/demo-project-progress.service';
import { DemoProjectSummaryService } from './service/demo-project-summary.service';
import { DemoTargetEnvironmentService } from './service/demo-target-environment.service';

import { Config } from '../app/service/config.component';
import { ForgeConfig } from './shared/forge-config';
import { FABRIC8_FORGE_API_URL } from './shared/forge-api-url';
import { FABRIC8_ORIGIN } from './shared/forge-origin';

import { AuthenticationService } from 'ngx-login-client';
import { MockAuthenticationService } from './shared/mock-auth.service';

import {
  DependencyCheckService,
  GitProviderService,
  LauncherModule,
  MissionRuntimeService,
  PipelineService,
  ProjectProgressService,
  ProjectSummaryService,
  TargetEnvironmentService,
  CommonService
} from '../app/launcher/launcher.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    LauncherModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  providers: [
    CommonService,
    { provide: DependencyCheckService, useClass: DemoDependencyCheckService},
    { provide: GitProviderService, useClass: DemoGitProviderService},
    { provide: MissionRuntimeService, useClass: DemoMissionRuntimeService },
    { provide: PipelineService, useClass: DemoPipelineService },
    { provide: ProjectProgressService, useClass: DemoProjectProgressService },
    { provide: ProjectSummaryService, useClass: DemoProjectSummaryService },
    { provide: TargetEnvironmentService, useClass: DemoTargetEnvironmentService},
    { provide: Config, useClass: ForgeConfig },
    { provide: FABRIC8_FORGE_API_URL, useValue: 'https://forge.api.prod-preview.openshift.io' },
    { provide: FABRIC8_ORIGIN, useValue: 'osio' },
    { provide: AuthenticationService, useClass: MockAuthenticationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
