import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import {
  GroupListComponent,
  GroupDetailsComponent,
  GroupCreateEditComponent,
  GroupMembersListComponent,
  AddMembersPopupComponent
} from './components';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupCreateEditComponent,
    GroupMembersListComponent,
    AddMembersPopupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
