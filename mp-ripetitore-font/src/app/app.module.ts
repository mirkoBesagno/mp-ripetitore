import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoStudioComponent } from './piano-studio/piano-studio.component';
import { SessioneStudioComponent } from './sessione-studio/sessione-studio.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoStudioComponent,
    SessioneStudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
