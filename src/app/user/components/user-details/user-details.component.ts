import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../services';
import { UserDetailsModel } from '../../models';
import { RoleType } from 'src/app/shared/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  data: UserDetailsModel;
  isLoading = true;

  RoleType = RoleType;

  constructor(private userService: UserService,
    private router: Router,
    public location: Location,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id");

      if (id) {
        this.isLoading = true;

        this.userService.get(id)
          .subscribe(data => {
            this.data = data;
            this.isLoading = false;
          });
      }
    })
  }

  delete() {

  }
}