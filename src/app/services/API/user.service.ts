import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL:string=`https://localhost:7009/User`;
  constructor(private http: HttpClient) { }

  addNewUser(formData: any): Observable<any> {
    const create_API = `${this.baseURL}/CreateUser`;
    console.log(formData);
    return this.http.post<any>(create_API, formData);
  }
  getUserData(){
    const create_API = `${this.baseURL}/GetUsers`;
    return this.http.get<any>(create_API);
  }
}
