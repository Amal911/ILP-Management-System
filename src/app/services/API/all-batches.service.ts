import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllBatchesService {

  private getBatchesAPI = 'https://localhost:7009/Batch/GetAllBatch';

  constructor(private http: HttpClient) { }

  getBatches(): Observable<any> {
    return this.http.get<any>(this.getBatchesAPI);
  }
}
