import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './components/actors/actors.component';
import { ActorWorksComponent } from './components/actor-works/actor-works.component';
import { LiteraryWorkComponent } from './components/literary-work/literary-work.component';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'actor/:name', component: ActorWorksComponent },
  { path: 'actor/:name/work/:work', component: LiteraryWorkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
