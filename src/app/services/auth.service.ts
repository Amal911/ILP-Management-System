import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: { name: string; role: string } = {
    name: 'Kavita',
    role: 'Admin',
  };
  // private currentUser: {name:string, role: string }={name:"Lekshmi", role:"Trainer"};
  // private currentUser: {name:string, role: string }={name:"Thulasi", role:"Trainee"};

  login(user: { name: string; role: string }) {
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

  private apiUrl = 'https://localhost:7009';

  constructor(private http: HttpClient) {}

  // getUserRole(token: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/getUserRole/${token}`);
  // }

  getUserRole(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/getUserRole/${token}`, { headers });
  }
}
