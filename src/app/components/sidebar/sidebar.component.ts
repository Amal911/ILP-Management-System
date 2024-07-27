import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  userRole: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
  }

  getSidebarItems() {
    const sidebarItems: SidebarItems = {
      admin: [
        { name: 'Home', link: 'dashboard', icon: 'fa-solid fa-house' },
        // { name: 'Curriculum', link: '/', icon: 'fa-solid fa-book-bookmark' },
        { name: 'Schedule', link: 'schedule', icon: 'bi bi-calendar-week-fill' },
        { name: 'Batches', link: 'batches', icon: 'fa-solid fa-users' },
        { name: 'Accounts', link: 'account', icon: 'fa-solid fa-user-gear' },
        { name: 'Leave Requests', link: 'leave', icon: 'bi bi-briefcase-fill' }
      ],
      trainer: [
        { name: 'Home', link: 'dashboard', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: 'schedule', icon: 'bi bi-calendar-week-fill' },
        { name: 'Batches', link: 'batches', icon: 'fa-solid fa-users' },
        { name: 'Assessments', link: 'assessments', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: 'assessments/online', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: 'leave', icon: 'bi bi-briefcase-fill' }
      ],
      trainee: [
        { name: 'Home', link: 'dashboard', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: 'schedule', icon: 'fa-solid fa-calendar-days' },
        { name: 'Assessments', link: 'assessments', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: 'assessments/online', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: 'trainee/leave', icon: 'bi bi-briefcase-fill' }
      ]
    };


    return sidebarItems[this.userRole] || [];
  }
}
