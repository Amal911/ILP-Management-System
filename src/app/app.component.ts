import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';

import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { EventType, RouterOutlet } from '@angular/router';
import { DoughnutGraphChartComponent } from './components/doughnut-graph-chart/doughnut-graph-chart.component';
import { DoughnutGraphCarouselComponent } from './components/doughnut-graph-carousel/doughnut-graph-carousel.component';
import { CreateScheduleComponent } from './pages/create-schedule/create-schedule.component';
import { EvaluateAssessmentsComponent } from './pages/evaluate-assessments/evaluate-assessments.component';
import { ButtonComponent } from './components/button/button.component';
import { ListingCardComponent } from './components/batch-listing-card/batch-listing-card.component';
import { BatchListingComponent } from './pages/batch-listing/batch-listing.component';
import { AssignmentListingComponent } from './pages/assignment-listing/assignment-listing.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { AccountComponent } from './pages/account/account.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserService } from './services/user.service';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  EventMessage,
  InteractionStatus,
  RedirectRequest,
  PopupRequest,
  AuthenticationResult,
} from '@azure/msal-browser';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ MainLayoutComponent, AdminDashboardComponent,LoginComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'ilp-management-system';
  loginDisplay = false;
  // private readonly _destroying$ = new Subject<void>();

  ngOnInit() {
    // const user = { name: 'Kavita', role: 'admin' };
    // // const user = { name: 'Lekshmi', role: 'trainer' };
    // // const user = { name: 'Thulasi K', role: 'trainee' };
    // this.userService.setCurrentUser(user);
    const userData = JSON.parse( localStorage.getItem("user") as string);
    let user = {name:userData.UserName,role:userData.roleName}
    console.log(user);
    
    this.authService.setCurrentUser(user);

  }
  constructor(private userService: UserService, private authService:AuthService) {}
}
