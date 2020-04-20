import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";

import { UserModel } from "../models";
import { AppSettingKeys } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class AppContextService {

    private userModelSubject: BehaviorSubject<UserModel>;
    public currentUserInfo: Observable<UserModel>;

    constructor() {
        const user = this.getUserInfo();

        this.userModelSubject = new BehaviorSubject<UserModel>(user);
        this.currentUserInfo = this.userModelSubject.asObservable();
    }

    public updateUserInfo(userModel: UserModel) {
        localStorage.setItem(AppSettingKeys.UserInfo, JSON.stringify(userModel));

        this.userModelSubject.next(userModel);
    }

    public getUserInfo(): UserModel {
        return !!localStorage.getItem(AppSettingKeys.UserInfo)
            ? JSON.parse(localStorage.getItem(AppSettingKeys.UserInfo))
            : null;
    }
}
