import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HttpParamsBuilder } from 'src/app/shared/utilities';
import { FilterModel, DataPagedModel, ChangePasswordModel } from 'src/app/shared/models';
import { UserDetailsModel, UserCreateModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${environment.apiUrl}/api/user`;

  constructor(private http: HttpClient) { }

  public search(filter: FilterModel) {
    const builder = new HttpParamsBuilder(filter);

    return this.http.get<DataPagedModel<UserDetailsModel>>(`${this.baseUrl}/search`, { params: builder.params });
  }

  get(id: string) {
    return this.http.get<UserDetailsModel>(`${this.baseUrl}/${id}`);
  }

  getMyInfo() {
    return this.http.get<UserDetailsModel>(`${this.baseUrl}/my-info`);
  }

  create(model: UserCreateModel) {
    return this.http.post<UserDetailsModel>(this.baseUrl, model);
  }

  update(model: UserDetailsModel) {
    return this.http.put<UserDetailsModel>(this.baseUrl, model);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  changePassword(model: ChangePasswordModel) {
    return this.http.put<void>(`${this.baseUrl}/change-password`, model);
  }
}
