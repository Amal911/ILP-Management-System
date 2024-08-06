import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineAssessmentTrainerListingService {

  //private baseUrl = 'https://a43fc81997d14579a60f7e5fe169e946.api.mockbin.io/';
  //private baseUrl = 'https://localhost:7120/api/ILPIntegration/GetScheduledAssessmentDetails/ILP%2003%202023-24';
  private baseUrl = 'https://localhost:7120/api/ILPIntegration/GetScheduledAssessmentDetails/ILP%202023-24%20Batch%201';

  private getScoresAPI = 'https://localhost:7120/api/ILPIntegration/GetAverageAndTotalScore/GetAverageAndTotalScore';
  
  constructor(private http: HttpClient) { }

  getAllOnlineAssessments(batchName:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getScores(traineeEmail: any, completedAssessmentId: number): Observable<any> {
      const params = new HttpParams()
        .set('traineeEmail', traineeEmail)
        .set('scheduledAssessmentId', completedAssessmentId.toString());
  
      return this.http.get(this.getScoresAPI, { params });
  }

  // getScores(userEmail: any, assessmentId: number): Observable<any> {
  //   return this.http.get("https://localhost:7120/api/ILPIntegration/GetAverageAndTotalScore/GetAverageAndTotalScore?traineeEmail=thulasi.k%40sreegcloudgmail.onmicrosoft.com&scheduledAssessmentId=1");
  // }
  getScores2(userEmail: any, assessmentId: number): Observable<any> {
    return this.http.get(`https://localhost:7120/api/ILPIntegration/GetAverageAndTotalScore/GetAverageAndTotalScore?traineeEmail=${userEmail}&scheduledAssessmentId=${assessmentId}`);
  }
}
