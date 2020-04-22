import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { HttpParamsBuilder } from 'src/app/shared/utilities';
import { FilterModel, DataPagedModel, PagedDataRequestModel } from 'src/app/shared/models';
import { GroupDetailsModel, GroupModel, GroupMemberModel, GroupCandidate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private readonly baseUrl = `${environment.apiUrl}/api/group`;

  constructor(private http: HttpClient) { }

  public search(filter: FilterModel) {
    const builder = new HttpParamsBuilder(filter);

    return this.http.get<DataPagedModel<GroupDetailsModel>>(`${this.baseUrl}/search`, { params: builder.params });
  }

  get(id: string) {
    return this.http.get<GroupDetailsModel>(`${this.baseUrl}/${id}`);
  }

  create(model: GroupModel) {
    return this.http.post<GroupModel>(this.baseUrl, model);
  }

  update(model: GroupModel) {
    return this.http.put<GroupModel>(this.baseUrl, model);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchCandidates(groupId: string, takeFirst: number, filter: string) {
    const builder = new HttpParamsBuilder()
      .append('takeFirst', takeFirst)
      .append('filter', filter);

    return this.http.get<GroupCandidate[]>(`${this.baseUrl}/${groupId}/candidates`, { params: builder.params });
  }

  getGroupMembers(groupId: string, filter: PagedDataRequestModel) {
    const builder = new HttpParamsBuilder(filter);

    return this.http.get<DataPagedModel<GroupMemberModel>>(`${this.baseUrl}/${groupId}/members`, { params: builder.params });
  }

  addMemberToGroup(groupId: string, userId: string) {
    return this.http.post<void>(`${this.baseUrl}/${groupId}/members`, { userId });
  }

  deleteMemberFromGroup(groupId: string, userId: string) {
    return this.http.delete<void>(`${this.baseUrl}/${groupId}/members/${userId}`);
  }
}

