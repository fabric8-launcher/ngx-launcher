// import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Main areas
import { WelcomeComponent } from './components/welcome.component';
import { DemoComponent } from '../app/launcher/demo-component/demo.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
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
export class AppModule {}
