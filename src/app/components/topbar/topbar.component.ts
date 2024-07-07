import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent  implements OnInit{
  userName: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userName = this.userService.getUserName();
  }

}
