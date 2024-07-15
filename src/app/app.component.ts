import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { EditScheduleComponent } from './pages/edit-schedule/edit-schedule.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { EditAccountModalComponent } from "./components/edit-account-modal/edit-account-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    ButtonComponent,
    ListingCardComponent,
    BatchListingComponent,
    AssignmentListingComponent,
    DropdownComponent,
    LeaveRequestComponent,
    SidebarComponent,
    CommonModule,
    TopbarComponent,
    AccountComponent,
    CreateScheduleComponent,
    EvaluateAssessmentsComponent,
    EditScheduleComponent,
    MainLayoutComponent,
    CreateScheduleComponent,
    EvaluateAssessmentsComponent,
    DoughnutGraphChartComponent,
    DoughnutGraphCarouselComponent,
    EditAccountModalComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'ilp-management-system';
  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = { name: 'DCruz', role: 'admin' };
    this.userService.setCurrentUser(user);
  }
}
