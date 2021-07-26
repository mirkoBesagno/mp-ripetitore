import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PianoStudioComponent } from './piano-studio/piano-studio.component';

const routes: Routes = [
  { path: 'piano-studio', component: PianoStudioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
