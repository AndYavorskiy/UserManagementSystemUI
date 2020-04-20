import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '../../services';
import { GroupCandidate } from '../../models';

@Component({
  selector: 'app-add-members-popup',
  templateUrl: './add-members-popup.component.html',
  styleUrls: ['./add-members-popup.component.scss']
})
export class AddMembersPopupComponent {

  data: GroupCandidate[] = [];
  isLoading = false;
  changesApplied = false;
  takeFirst = 25;
  filterText = "";

  get isfilterTextValid() { return this.filterText.trim().length > 1; }

  constructor(
    private groupService: GroupService,
    public dialogRef: MatDialogRef<AddMembersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public groupId: string) {
      this.dialogRef.beforeClosed()
        .subscribe(() => this.dialogRef.close(this.changesApplied));
  }

  searchCandidates() {
    if (!this.isfilterTextValid) {
      this.data = [];
      return;
    }

    this.isLoading = true;

    this.groupService.searchCandidates(this.groupId, this.takeFirst, this.filterText)
      .subscribe(data => {
        this.data = data;
        this.isLoading = false;
      })
  }

  addToGroup(user: GroupCandidate) {
    this.groupService.addMemberToGroup(this.groupId, user.id)
      .subscribe(() => {
        user.insideGroup = true;
        this.changesApplied = true;
      })
  }

  deleteFromGroup(user: GroupCandidate) {
    this.groupService.deleteMemberFromGroup(this.groupId, user.id)
      .subscribe(() => {
        user.insideGroup = false;
        this.changesApplied = true;
      })
  }
}
