import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL:string=`https://localhost:7009/api/User`;
  constructor(private http: HttpClient) { }

  addNewUser(formData: any): Observable<any> {
    const create_API = `${this.baseURL}`;
    console.log(formData);
    return this.http.post<any>(create_API, formData);
  }
  getUserData(){
    const getUserDataApi = `${this.baseURL}`;
    return this.http.get<any>(getUserDataApi);
  }
  getTrainerData(){
    const getTrainerDataApi = `${this.baseURL}/GetTrainers`;
    return this.http.get(getTrainerDataApi);
  }

  getUsersRoles(): Observable<any> {
    const populate_poc_dropdown = `${this.baseURL}`;
    return this.http.get<any>(populate_poc_dropdown);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/GetUser/${id}`);
}

}