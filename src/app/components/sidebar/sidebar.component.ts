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
    console.log(this.userRole);
    
  }

  getSidebarItems() {
    const sidebarItems: SidebarItems = {
      admin: [
        { name: 'Home', link: '', icon: 'fa-solid fa-house' },
        // { name: 'Curriculum', link: '/', icon: 'fa-solid fa-book-bookmark' },
        { name: 'Batches', link: 'batches', icon: 'fa-solid fa-users' },
        { name: 'Schedule', link: 'schedule', icon: 'bi bi-calendar-week-fill' },
        { name: 'Accounts', link: 'account', icon: 'fa-solid fa-user-gear' },
        { name: 'Leave Requests', link: 'leave', icon: 'bi bi-briefcase-fill' },
        { name: 'Phases', link: 'phases', icon: 'bi bi-briefcase-fill' },
        { name: 'Assessment Type', link: 'assessment-criteria', icon: 'bi bi-briefcase-fill' }
      ],
      trainer: [
        { name: 'Home', link: '', icon: 'fa-solid fa-house' },
        { name: 'Batches', link: 'batches', icon: 'fa-solid fa-users' },
        { name: 'Schedule', link: 'schedule', icon: 'bi bi-calendar-week-fill' },
        { name: 'Assessments', link: 'assessments', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: 'assessments/online', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: 'leave', icon: 'bi bi-briefcase-fill' }
      ],
      trainee: [
        { name: 'Home', link: '', icon: 'fa-solid fa-house' },
        { name: 'Schedule', link: 'schedule', icon: 'fa-solid fa-calendar-days' },
        { name: 'Assessments', link: 'assessments', icon: 'bi bi-list-task' },
        { name: 'Online Assessments', link: 'assessments/online', icon: 'fa-solid fa-clipboard-list' },
        { name: 'Leave Requests', link: 'trainee/leave', icon: 'bi bi-briefcase-fill' }
      ]
    };


    return sidebarItems[this.userRole.toLowerCase()] || [];
  }
}
