import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from './services/user.service';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MainLayoutComponent,
    AdminDashboardComponent
],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'ilp-management-system';
  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = { name: 'Kavita', role: 'admin' };
    // const user = { name: 'Lekshmi', role: 'trainer' };
    // const user = { name: 'Thulasi K', role: 'trainee' };
    this.userService.setCurrentUser(user);
  }
}
