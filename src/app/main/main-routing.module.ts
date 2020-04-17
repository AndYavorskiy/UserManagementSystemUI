import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
      { path: 'groups', loadChildren: () => import('../group/group.module').then(m => m.GroupModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
