import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
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
        { name: 'Home', link: '/', icon: 'fa-solid fa-house' },
        { name: 'Curriculum', link: '/', icon: 'fa-solid fa-book-bookmark' },
        { name: 'Batches', link: '/', icon: 'fa-solid fa-users' },
        { name: 'Accounts', link: '/', icon: 'fa-solid fa-user-gear' },
        { name: 'Leave Requests', link: '/', icon: 'bi bi-briefcase-fill' }
      ],
      trainer: [
        { name: 'Home', link: '/', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: '/', icon: 'bi bi-calendar-week-fill' },
        { name: 'Tasks', link: '/', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: '/', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: '/', icon: 'bi bi-briefcase-fill' }
      ],
      trainee: [
        { name: 'Home', link: '/', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: '/', icon: 'fa-solid fa-calendar-days' },
        { name: 'Tasks', link: '/', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: '/', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: '/', icon: 'bi bi-briefcase-fill' }
      ]
    };

    return sidebarItems[this.userRole] || [];
  }
}