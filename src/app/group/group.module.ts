import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
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
  entryComponents:[
    AddMembersPopupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule
  ]
})
export class GroupModule { }
