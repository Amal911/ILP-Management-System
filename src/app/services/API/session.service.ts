import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }
  baseURL:string=`https://localhost:7009/Session`;

  private postUrl='https://localhost:7009/api/Attendance';

  private getTraineeListUrl='https://localhost:7009/Batch/GetTraineeList/TraineeList/';

  PostAttendance(attendanceDTO:any):Observable<any[]>{
    return this.http.post<any>(`${this.postUrl}`, attendanceDTO)
  }

 
  createSchedule(formData: any): Observable<any> {
    const create_API = `${this.baseURL}/CreateSession`;
    return this.http.post<any>(create_API, formData);
  }

  fetchSession(sessionId:number):Observable<any> {
    const fetch_API=`${this.baseURL}/GetSession/${sessionId}`;
    return this.http.get<any>(fetch_API);
  }

  updateSchedule(formData: any,couponId: number): Observable<any> {
    console.log(formData);
    const update_API = `${this.baseURL}/UpdateSessionbyId/${couponId}`;
    return this.http.put<any>(update_API, formData);
  }

  getAllSessions(): Observable<any> {
    return this.http.get(`${this.baseURL}/GetAllSessions`);
  }
  getTodaysSession(batchId:number): Observable<any> {
    return this.http.get(`${this.baseURL}/GetTodaysSessions/${batchId}`);
  }




}

