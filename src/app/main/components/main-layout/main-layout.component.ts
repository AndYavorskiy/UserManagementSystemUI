import { Component, OnInit } from '@angular/core';
import { AuthorizationService, AppContextService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public appContextService: AppContextService,
    private authorizationService: AuthorizationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authorizationService.logout();
    this.router.navigate(['/auth']);
  }
}
