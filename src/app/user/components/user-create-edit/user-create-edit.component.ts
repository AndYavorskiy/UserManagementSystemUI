import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RoleType, GenderType } from 'src/app/shared/models';
import { UserCreateModel, UserDetailsModel } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {

  data: UserDetailsModel;
  isLoading = false;
  maxDate = new Date();

  form: FormGroup;
  RoleType = RoleType;
  GenderType = GenderType;

  roles = [
    RoleType.Admin,
    RoleType.Moderator,
    RoleType.User
  ];

  genders = [
    GenderType.Male,
    GenderType.Femail,
    GenderType.Other
  ];

  constructor(private userService: UserService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      phone: [''],
      birthday: [null]
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
              email: data.email,
              role: data.role,
              phone: data.phone,
              birthday: data.birthday,
              gender: data.gender,
              password: null,
              confirmPassword: null
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
      this.userService.update(model)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
