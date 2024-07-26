import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7009';

  constructor(private http: HttpClient) {}

  // getUserRole(token: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/getUserRole/${token}`);
  // }

  getUserRole(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/getUserRole/${token}`, { headers });
  }
}
