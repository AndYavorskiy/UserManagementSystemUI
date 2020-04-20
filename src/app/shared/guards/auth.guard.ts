import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthorizationService } from '../services';
import { AppContextService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthorizationService,
        private appContextService: AppContextService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const user = this.appContextService.getUserInfo();

        if (user && user.passwordChangeRequired) {
            return this.router.parseUrl('/auth/change-password');
        }

        return !!this.authService.getAuthToken() || this.router.parseUrl('/auth');
    }
}
