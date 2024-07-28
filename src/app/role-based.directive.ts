import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[appRoleBased]',
  standalone:true,
})
export class RoleBasedDirective implements OnInit {
  @Input('appRoleBased') allowedRoles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userRole = this.authService.getCurrentUserRole();
    if (userRole && this.allowedRoles.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}