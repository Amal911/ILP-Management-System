import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineAssessmentTrainerListingService {

  private baseUrl = 'https://a43fc81997d14579a60f7e5fe169e946.api.mockbin.io/';

  constructor(private http: HttpClient) { }

  getAllOnlineAssessments(batchName:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
