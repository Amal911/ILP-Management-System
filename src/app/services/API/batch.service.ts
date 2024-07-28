import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }
  programUrl = 'https://localhost:7009/api/BatchProgram';
  batchUrl = 'https://localhost:7009/Batch'
  getProgram(){
    return this.http.get(this.programUrl);
  }
  getBatchByProgram(programId:number){
    return this.http.get(`${this.batchUrl}/GetBatchByProgram/${programId}`)
  }
}
