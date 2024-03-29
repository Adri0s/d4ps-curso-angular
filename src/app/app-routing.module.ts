import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveFormComponent } from './components/save-form/save-form.component';

const routes: Routes = [
  {path: 'save', component: SaveFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
