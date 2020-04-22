import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { UserModel } from '../models';
import { AppSettingKeys } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class AppContextService {

    private userModelSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor() {
        const user = AppContextService.getCurrentUser();

        this.userModelSubject = new BehaviorSubject<UserModel>(user);
        this.currentUser = this.userModelSubject.asObservable();
    }

    public updateUserInfo(userModel: UserModel) {
        localStorage.setItem(AppSettingKeys.UserInfo, JSON.stringify(userModel));

        this.userModelSubject.next(userModel);
    }

    public static getCurrentUser(): UserModel {
        return !!localStorage.getItem(AppSettingKeys.UserInfo)
            ? JSON.parse(localStorage.getItem(AppSettingKeys.UserInfo))
            : null;
    }
}
