import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchListingService {

  private getBatchesAPI = 'https://localhost:7009/Batch/GetAllBatchDetails';
  private getbatchbyId='https://localhost:7009/Batch/GetBatchDetailById/';

  constructor(private http: HttpClient) { }

  getBatches(): Observable<any> {
    return this.http.get<any>(this.getBatchesAPI);
  }

  getBatchById(id: number): Observable<any> {
    return this.http.get<any>(`${this.getbatchbyId}&{batchId}`);
  }

}
