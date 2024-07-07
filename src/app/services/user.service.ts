import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any = null;

  constructor() { }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
  getUserName() {
    return this.currentUser ? this.currentUser.name : null;
  }
  getUserRole() {
    return this.currentUser ? this.currentUser.role : null;
  }
}