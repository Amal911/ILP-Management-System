import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AssignmentListingComponent } from '../../pages/assignment-listing/assignment-listing.component';
import { AccountComponent } from '../../pages/account/account.component';
import { BatchListingComponent } from '../../pages/batch-listing/batch-listing.component';
import { LeaveRequestComponent } from '../../pages/leave-request/leave-request.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    AssignmentListingComponent,
    AccountComponent,
    BatchListingComponent,
    LeaveRequestComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
