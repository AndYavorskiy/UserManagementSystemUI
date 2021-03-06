import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/user/services';
import { AuthorizationService } from 'src/app/shared/services';
import { AppContextService } from 'src/app/shared/services';
import { MustMatch } from 'src/app/shared/utilities';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  returnUrl: string;

  form: FormGroup;
  showErrorMessage: boolean;
  isLoading = false;

  get f() { return this.form.controls; }
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private appContextService: AppContextService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    }, {
      validator: MustMatch('newPassword', 'repeatPassword')
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue();
    const user = AppContextService.getCurrentUser();

    this.isLoading = true;

    this.userService.changePassword({
      login: user.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    })
      .subscribe(() => {
        this.isLoading = false;
        user.passwordChangeRequired = false;
        this.appContextService.updateUserInfo(user);

        this.router.navigate([this.returnUrl]);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
