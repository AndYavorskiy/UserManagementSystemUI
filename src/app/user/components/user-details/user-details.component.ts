import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../services';
import { UserDetailsModel } from '../../models';
import { RoleType, GenderType } from 'src/app/shared/models';
import { AppContextService } from 'src/app/shared/services';
import { GroupModel } from 'src/app/group/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  isLoading = true;
  data: UserDetailsModel;

  groups: GroupModel[] = [];

  RoleType = RoleType;
  GenderType = GenderType;

  isEditVisible = false;
  canNavigateToGroup = false;

  constructor(
    public location: Location,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.isLoading = true;

        this.userService.get(id)
          .subscribe(data => {
            const currentUser = AppContextService.getCurrentUser();

            this.isEditVisible = currentUser.role === RoleType.Admin
              || currentUser.role === RoleType.Moderator && data.role === RoleType.User
              || currentUser.id === data.id;

            this.canNavigateToGroup = currentUser.role !== RoleType.User;

            this.data = data;
            this.isLoading = false;
          });

        this.userService.getUserGroups(id)
          .subscribe(groups => this.groups = groups);
      }
    });
  }

  getImageThumbNail() {
    switch (this.data.gender) {
      case GenderType.Male:
        return 'assets/images/avatar-boy.png';
      case GenderType.Femail:
        return 'assets/images/avatar-girl.png';
      case GenderType.Other:
        return 'assets/images/avatar-other.png';
    }
  }
}
