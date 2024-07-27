import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  baseURL:string=`https://localhost:7009/Assessment`;

  constructor(private http: HttpClient) { }

  createAssessment(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/CreateAssessment`, formData);
  }

}
