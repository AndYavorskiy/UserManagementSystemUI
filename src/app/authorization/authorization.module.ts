import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  LoginComponent,
  ChangePasswordComponent
} from './components';

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule
  ]
})
export class AuthorizationModule { }
