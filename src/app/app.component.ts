import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from "./components/topbar/topbar.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SidebarComponent, CommonModule, TopbarComponent]
})
export class AppComponent {
  title = 'ilp-management-system';
  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = { name: 'DCruz', role: 'trainee' };
    this.userService.setCurrentUser(user);
  }
}