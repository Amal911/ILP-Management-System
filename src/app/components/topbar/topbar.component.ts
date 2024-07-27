import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MsalService } from '@azure/msal-angular';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  userName: string = '';

  constructor(
    private userService: AuthService,
    private authService: MsalService,
    
    // private authService: AuthService
  ) {}

  ngOnInit() {
    // this.userName = this.userService.getUserName();
    this.userName = this.userService.getCurrentUser().name;
  }

  logout() {
    this.authService.logoutRedirect();
  }
}
