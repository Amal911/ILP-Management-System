import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: {name:string, role: string }={name:"Kavita", role:"Admin"};
  // private currentUser: {name:string, role: string }={name:"Lekshmi", role:"Trainer"};
  // private currentUser: {name:string, role: string }={name:"Thulasi", role:"Trainee"};
  

  login(user: { name:string, role: string}) {
    this.currentUser = user;
  }

  
  getCurrentUserRole(): string {
    return this.currentUser.role;
  }
  getCurrentUser() {
    return this.currentUser;
  }
  
  isAdmin(): boolean {
    return this.getCurrentUserRole() === 'Admin';
  }

  isTrainer(): boolean {
    return this.getCurrentUserRole() === 'Trainer';
  }
  
  isTrainee(): boolean {
    return this.getCurrentUserRole() === 'Trainee';
  }
  logout() {
    // this.currentUser = null;
  }
}