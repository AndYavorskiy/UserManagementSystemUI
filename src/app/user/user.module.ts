import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

import {
  UserListComponent,
  UserDetailsComponent,
  UserCreateEditComponent,
  UserGroupsListComponent
} from './components';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserCreateEditComponent,
    UserGroupsListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
