import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl = 'https://localhost:7009';

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/BatchProgram`);
  }

  getBatchesByProgramId(programId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Batch/GetBatchByProgram/${programId}`);
  }

  getAssessmentsByBatchId(batchId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Assessment/GetAssessmentsByBatchId/GetAssessmentsByBatchId/getByBatchId/${batchId}`);
  }
}