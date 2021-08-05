import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoStudioComponent } from './piano-studio/piano-studio.component';
import { SessioneStudioComponent } from './sessione-studio/sessione-studio.component';
import { RipetizioneComponent } from './ripetizione/ripetizione.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

/* import { TreeviewModule } from 'ngx-treeview';
import { TreeModule } from '@circlon/angular-tree-component';
 */

@NgModule({
  declarations: [
    AppComponent,
    PianoStudioComponent,
    SessioneStudioComponent,
    RipetizioneComponent,
    PomodoroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /* TreeviewModule.forRoot(), // fa un po' schifo!!! 
    TreeModule  // fa un po' schifo!!! 
     */
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
