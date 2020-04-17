import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
