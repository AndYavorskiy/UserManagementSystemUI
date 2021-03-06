import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services';
import { AuthorizationService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string;

  form: FormGroup;
  showErrorMessage: boolean;
  isLoading = false;

  get f() { return this.form.controls; }
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthorizationService,
    private appContextService: AppContextService,
    private route: ActivatedRoute,
    private router: Router) {

    // redirect to home if already logged in
    if (this.appContextService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue();

    this.isLoading = true;

    this.subscription.add(this.authService.login({ login: data.login, password: data.password })
      .subscribe(token => {
        this.authService.saveAuthToken(token);

        this.userService.getMyInfo()
          .subscribe(userData => {
            this.appContextService.updateUserInfo(userData);
            this.isLoading = false;
            this.router.navigate([this.returnUrl]);
          });
      }, error => {
        this.isLoading = false;
        this.showErrorMessage = true;
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
