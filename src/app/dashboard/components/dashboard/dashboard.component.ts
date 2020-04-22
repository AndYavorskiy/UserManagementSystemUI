import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/shared/services';
import { RoleType } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  RoleType = RoleType;

  constructor(public appContextService: AppContextService) { }
}
