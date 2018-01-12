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
import { DemoComponent } from '../app/launcher/demo-component/demo.component';

import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';

// Provide window object so as to not break SSR if using universal
export const getWindow = () => window;
export const providers: Provider[] = [
  { provide: WindowRef, useFactory: (getWindow) }
];

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InViewportModule.forRoot(providers)
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    DemoComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
