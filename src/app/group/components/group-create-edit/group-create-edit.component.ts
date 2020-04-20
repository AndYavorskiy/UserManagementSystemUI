import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupModel } from '../../models';

@Component({
  selector: 'app-group-create-edit',
  templateUrl: './group-create-edit.component.html',
  styleUrls: ['./group-create-edit.component.scss']
})
export class GroupCreateEditComponent implements OnInit {

  data: GroupModel;

  get isCreteMode() { return !this.data; }

  isLoading = false;
  maxDate = new Date();

  form: FormGroup;

  constructor(private groupService: GroupService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      isActive: [false],
    });

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id");

      if (id) {
        this.isLoading = true;

        this.groupService.get(id)
          .subscribe(data => {
            this.data = data;

            this.form.setValue({
              name: data.name,
              isActive: data.isActive
            });

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

    const model = this.data ? Object.assign({}, this.data) : new GroupModel();

    model.name = formData.name;
    model.isActive = formData.isActive;

    if (this.isCreteMode) {
      this.groupService.create(model)
        .subscribe(result => this.router.navigate(["/groups", result.id], { replaceUrl: true }));
    } else {
      this.groupService.update(model)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.location.back();
  }
}
