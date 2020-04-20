import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent, UserDetailsComponent, UserCreateEditComponent } from './components';
import { AuthGuard } from '../shared/guards';
import { RoleType } from '../shared/models';

const routes: Routes = [
  {
    path: '', component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [RoleType.Admin, RoleType.Moderator]
    }
  },
  {
    path: 'create', component: UserCreateEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [RoleType.Admin, RoleType.Moderator]
    }
  },
  { path: 'edit/:id', component: UserCreateEditComponent },
  { path: ':id', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
