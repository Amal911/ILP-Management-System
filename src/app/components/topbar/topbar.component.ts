import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  userName: string = '';

  constructor(private userService: UserService,
    private authService: MsalService,
  ) { }

  ngOnInit() {
    this.userName = this.userService.getUserName();
  }

  logout() {
    this.authService.logoutRedirect();
  }

}
