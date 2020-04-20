import { Observable, throwError } from 'rxjs';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthorizationService } from "../services"
import { catchError, switchMap, map } from 'rxjs/operators';
import { AuthTokenModel } from '../models';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshing = false;

    constructor(private authorizationService: AuthorizationService,
        private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authorizationService.getAuthToken();

        if (token) {
            request = this.addToken(request, token.token);
        }

        return next.handle(request).pipe(catchError(error => {
            if (error.status === 401 && error.headers.has('Token-Expired')) {
                return this.handle401Error(request, next, token);
            }

            if (error.status === 403) {
                this.router.navigate(["/"]);
                location.reload(true);
            }

            return throwError(error);
        }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, token: AuthTokenModel) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            return this.authorizationService.refresh(token.token, token.refreshToken).pipe(
                switchMap((newToken) => {
                    this.isRefreshing = false;
                    this.authorizationService.saveAuthToken(newToken);
                    return next.handle(this.addToken(request, newToken.token));
                }));

        } else {
            return next.handle(this.addToken(request, token.token));
        }
    }
}
