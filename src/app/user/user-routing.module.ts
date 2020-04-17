import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent, UserDetailsComponent, UserCreateEditComponent } from './components';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create', component: UserCreateEditComponent },
  { path: 'edit/:id', component: UserCreateEditComponent },
  { path: ':id', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
