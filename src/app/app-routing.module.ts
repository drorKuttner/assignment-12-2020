import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {DepositsPageComponent} from './deposits-page/deposits-page.component';

const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'deposits', component: DepositsPageComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
