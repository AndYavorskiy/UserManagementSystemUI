import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupListComponent, GroupDetailsComponent, GroupCreateEditComponent } from './components';

const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: ':id', component: GroupDetailsComponent },
  { path: 'create', component: GroupCreateEditComponent },
  { path: 'edit/:id', component: GroupCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
