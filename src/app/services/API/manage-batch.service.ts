import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBatchService {
  private manageBatchUrl:string = 'https://localhost:7009/Batch/GetBatchDetailById';

  constructor(private http:HttpClient) { }

  getBatchDetailByID(id:number):Observable<any> {
    const url=`${this.manageBatchUrl}/${id}`;
    return this.http.get<any>(url);

  }
}
