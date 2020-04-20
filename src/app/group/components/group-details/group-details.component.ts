import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { GroupDetailsModel, GroupMemberModel } from '../../models';
import { GroupService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddMembersPopupComponent } from '../add-members-popup/add-members-popup.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  groupId: string;
  data: GroupDetailsModel;
  isLoading = true;

  isListLoading = false;

  dataSource = new MatTableDataSource<GroupMemberModel>();

  displayedColumns: string[] = ['logo', 'firstName', 'lastName', 'email', 'actions'];
  totalCount = 0;
  pageSizeOptions = [10, 25, 50];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;

  constructor(private groupService: GroupService,
    private dialog: MatDialog,
    private router: Router,
    public location: Location,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.groupId = params.get("id");

      if (this.groupId) {
        this.isLoading = true;

        this.groupService.get(this.groupId)
          .subscribe(data => {
            this.data = data;
            this.isLoading = false;
          });

        this.loadMembers();
      }
    })
  }

  delete() {
    this.groupService.delete(this.data.id)
      .subscribe(() => { this.location.back() })
  }

  deleteMember(item: GroupMemberModel) {
    this.groupService.deleteMemberFromGroup(this.groupId, item.id)
      .subscribe(() => { this.loadMembers() })
  }

  onPaginatorChanges(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadMembers();
  }

  loadMembers() {
    this.isListLoading = true;

    this.groupService.getGroupMembers(this.groupId, { pageIndex: this.pageIndex, pageSize: this.pageSize })
      .subscribe(data => {
        this.isListLoading = true;
        this.dataSource.data = data.items;
        this.totalCount = data.totalCount;
      })
  }

  addMembers(): void {
    const dialogRef = this.dialog.open(AddMembersPopupComponent, {
      width: '500px',
      data: this.groupId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        this.loadMembers();
      }
    });
  }
}
