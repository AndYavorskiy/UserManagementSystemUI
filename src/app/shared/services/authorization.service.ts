import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AppSettingKeys } from '../constants';
import { UserModel, AuthModel, AuthTokenModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly baseUrl = `${environment.apiUrl}/api/authorization`;

  constructor(private http: HttpClient) { }

  login(authModel: AuthModel) {
    return this.http.post<AuthTokenModel>(`${this.baseUrl}/login`, authModel);
  }

  refresh(token: string, refreshToken: string) {
    return this.http.post<AuthTokenModel>(`${this.baseUrl}/refresh`, {
      token,
      refreshToken
    });
  }

  getAuthToken() {
    const token = localStorage.getItem(AppSettingKeys.AuthCredentials);

    return !!token ? JSON.parse(token) as AuthTokenModel : null;
  }

  saveAuthToken(authTokenModel: AuthTokenModel) {
    localStorage.setItem(AppSettingKeys.AuthCredentials, JSON.stringify(authTokenModel));
  }

  logout() {
    localStorage.removeItem(AppSettingKeys.AuthCredentials);
    localStorage.removeItem(AppSettingKeys.UserInfo);
  }
}
