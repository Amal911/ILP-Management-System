import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface SidebarItem {
  name: string;
  link: string;
  icon: string;
}

interface SidebarItems {
  [key: string]: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{
  userRole!: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userRole = this.authService.getCurrentUserRole();
  }

  getSidebarItems() {
    const sidebarItems: SidebarItems = {
      Admin: [
        { name: 'Home', link: '', icon: 'fa-solid fa-house' },
        // { name: 'Curriculum', link: '/', icon: 'fa-solid fa-book-bookmark' },
        { name: 'Schedule', link: 'schedule', icon: 'bi bi-calendar-week-fill' },
        { name: 'Batches', link: 'batches', icon: 'fa-solid fa-users' },
        { name: 'Accounts', link: 'account', icon: 'fa-solid fa-user-gear' },
        { name: 'Leave Requests', link: 'leave', icon: 'bi bi-briefcase-fill' }
      ],
      Trainer: [
        { name: 'Home', link: '', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: 'schedule', icon: 'bi bi-calendar-week-fill' },
        { name: 'Batches', link: 'batches', icon: 'fa-solid fa-users' },
        { name: 'Assessments', link: 'assessments', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: '/', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: 'leave', icon: 'bi bi-briefcase-fill' }
      ],
      Trainee: [
        { name: 'Home', link: '', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: 'schedule', icon: 'fa-solid fa-calendar-days' },
        { name: 'Assessments', link: 'assessments', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: '/', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: 'trainee/leave', icon: 'bi bi-briefcase-fill' }
      ]
    };

    return sidebarItems[this.userRole] || [];
  }
}
