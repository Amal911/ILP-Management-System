import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCriteriaService {
  private getCriteriaUrl='https://localhost:7009/api/AssessmentType';
  private postCriteriaUrl='https://localhost:7009/api/AssessmentType/';
  private deleteCriteriaUrl='https://localhost:7009/api/AssessmentType';

  constructor(private http:HttpClient) { }

  getAssessmentTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.getCriteriaUrl);
  }

  addNewAssessmentType(assessmentType: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.postCriteriaUrl, assessmentType, { headers });
  }

  deleteAssessmentType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteCriteriaUrl}/DeleteAssessmentType?id=${id}`);
  }
}
