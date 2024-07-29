import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private applyLeave = 'https://localhost:7009/api/Leave';

  constructor(private http: HttpClient) {}

  postLeaveRequest(leaveDto: any): Observable<any> {
    return this.http.post<any>(this.applyLeave, leaveDto);
  }

  getappliedLeaves(): Observable<any>{
    return this.http.get<any>(this.applyLeave)
  }

  getLeaveRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.applyLeave}/leaveRequests`);
  }

  updateApprovalStatus(id: number, LeaveApprovalUpdateDTO: any): Observable<any> {
    console.log(LeaveApprovalUpdateDTO);
    
    return this.http.put(`${this.applyLeave}/updateApprovalStatus/${id}`, LeaveApprovalUpdateDTO);
  }

  getLeavesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.applyLeave}/user/${userId}/leaves`);
}

}

