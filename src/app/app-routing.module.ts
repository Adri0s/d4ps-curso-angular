import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveFormComponent } from './components/save-form/save-form.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: 'save', component: SaveFormComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
