import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AppContextService } from '../services';
import { RoleType } from '../models';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {

  allowedRoles: RoleType[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  @Input()
  set ifRole(allowedRoles: RoleType[]) {
    this.allowedRoles = allowedRoles;

    let user = AppContextService.getCurrentUser();

    if (!this.allowedRoles || this.allowedRoles.length === 0 || !user) {
      this.viewContainer.clear();
      return;
    }

    const allowed = this.allowedRoles.some(x => x == user.role);

    if (allowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainer.clear();
    }
  }
}
