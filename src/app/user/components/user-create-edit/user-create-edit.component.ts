import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RoleType, GenderType, UserModel } from 'src/app/shared/models';
import { UserCreateModel, UserDetailsModel } from '../../models';
import { UserService } from '../../services';
import { AppContextService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {

  loggedUser: UserModel;

  data: UserDetailsModel;
  get isCreateMode() { return !this.data; }
  isLoading = false;
  maxDate = new Date();

  form: FormGroup;
  RoleType = RoleType;
  GenderType = GenderType;

  roles: RoleType[] = [];

  genders = [
    GenderType.Male,
    GenderType.Femail,
    GenderType.Other
  ];

  constructor(private userService: UserService,
    private appContextService: AppContextService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loggedUser = this.appContextService.getUserInfo();

    switch (this.loggedUser.role) {
      case RoleType.Admin:
        this.roles = [
          RoleType.Admin,
          RoleType.Moderator,
          RoleType.User
        ];
        break;

      case RoleType.Moderator:
        this.roles = [
          RoleType.User
        ];
        break;
      default: break;
    }

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      phone: [''],
      birthday: [null],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isActive: [false],
    });

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id");

      if (id) {
        this.isLoading = true;

        this.userService.get(id)
          .subscribe(data => {
            this.data = data;

            this.form.setValue({
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              email: data.email,
              role: data.role,
              phone: data.phone,
              birthday: data.birthday,
              password: null,
              confirmPassword: null,
              isActive: data.isActive
            });

            this.form.controls.password.clearValidators();
            this.form.controls.confirmPassword.clearValidators();

            this.isLoading = false;
          });
      }
    })
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();

      return;
    }

    const formData = this.form.getRawValue();

    const model = this.data ? Object.assign({}, this.data) : new UserCreateModel();

    model.firstName = formData.firstName;
    model.lastName = formData.lastName;
    model.email = formData.email;
    model.role = formData.role;
    model.phone = formData.phone;
    model.birthday = formData.birthday;
    model.gender = formData.gender;

    if (model instanceof UserCreateModel) {
      model.password = formData.password;

      this.userService.create(model)
        .subscribe(result => this.router.navigate(["/users", result.id], { replaceUrl: true }));
    } else {
      model.isActive = formData.isActive;

      this.userService.update(model)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
