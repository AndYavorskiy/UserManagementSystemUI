import { Component, OnInit } from '@angular/core';
import { ModelProperties, FilterModel } from 'src/app/shared/models';
import { GroupDetailsModel } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { GroupService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  filters = ModelProperties.propertiesOf<FilterModel>();
  isLoading = false;
  isLoadingError = false;

  dataSource = new MatTableDataSource<GroupDetailsModel>();

  displayedColumns: string[] = ['name', 'membersCount'];
  totalCount = 0;
  pageSizeOptions = [10, 25, 50];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  filterText = "";
  includeInactive = true;

  constructor(private groupService: GroupService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.
      pipe(take(1))
      .subscribe(param => {
        this.filterText = param[this.filters('filterText')] || this.filterText;
        this.pageIndex = param[this.filters('pageIndex')] || this.pageIndex;
        this.pageSize = param[this.filters('pageSize')] || this.pageSize;
        this.includeInactive = param[this.filters('includeInactive')] || this.includeInactive;

        this.searchData();
      });
  }

  applyFilter(event: Event) {
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

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: fiter
      });

    this.isLoading = true;

    this.groupService.search(fiter)
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
