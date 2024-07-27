import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  private postUrl='https://localhost:7009/Attendance';

  PostAttendance(attendanceDTO:any):Observable<any[]>{
    return this.http.post<any>(`${this.postUrl}`, attendanceDTO)
  }}
