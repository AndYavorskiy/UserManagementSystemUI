import { Component, OnInit } from '@angular/core';

import { UserDetailsModel } from '../../models';
import { UserService } from '../../services';
import { RoleType, FilterModel } from 'src/app/shared/models';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  isLoading = false;
  isLoadingError = false;
  RoleType = RoleType;

  dataSource = new MatTableDataSource<UserDetailsModel>();

  displayedColumns: string[] = ['logo', 'firstName', 'lastName', 'email', 'role'];
  totalCount = 0;
  pageSizeOptions = [10, 25, 50, 100];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  filterText = "";
  includeInactive = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.searchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterText = filterValue.trim().toUpperCase();
    this.pageIndex = 0;

    this.searchData();
  }

  onPaginatorChanges(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.searchData();
  }

  searchData() {
    const fiter = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      includeInactive: this.includeInactive,
      filterText: this.filterText
    } as FilterModel;

    // this.router.navigate(
    //   [],
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams: fiter
    //   });

    this.isLoading = true;

    this.userService.search(fiter)
      .subscribe(data => {
        this.dataSource.data = data.items;
        this.totalCount = data.totalCount;
        this.isLoading = false;
        this.isLoadingError = false;
      }, error => {
        this.dataSource.data = [];
        this.isLoading = false;
        this.isLoadingError = true;
      });
  }
}
