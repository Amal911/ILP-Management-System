import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateBatchRequestDTO } from '../../../models/BatchDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageBatchService {
  private manageBatchUrl:string = 'https://localhost:7009/Batch/GetBatchDetailById';
  private baseUrl:string = 'https://localhost:7009/Batch/GetBatchDetailById';

  constructor(private http:HttpClient) { }

  // getBatchDetailByID(id:number):Observable<any> {
  //   const url=`${this.manageBatchUrl}/${id}`;
  //   return this.http.get<any>(url);

  // }
  getBatchDetailByID(id: number) {
    return this.http.get(`https://localhost:7009/Batch/GetBatchDetailById/${id}`);
}
updateBatch(id: number, batch: UpdateBatchRequestDTO): Observable<void> {
  return this.http.put<void>(`https://localhost:7009/Batch/UpdateBatch/${id}`, batch);
}



  getPhases(){
    return this.http.get('https://localhost:7009/api/Phase');
  }
  creatNewPhase(body:any){
    return this.http.post('https://localhost:7009/Phase/AddNewPhase',body)
  }
  updatePhase(id: number, body: any) {
    return this.http.put(`https://localhost:7009/Phase/UpdatePhase/${id}`, body);
}
  deletePhase(id:number){
    return this.http.delete('https://localhost:7009/Phase/Deletephase/'+id);
  }
  getBatchType(){
    return this.http.get('https://localhost:7009/BatchType/GetBatchTypes');
  }
  getBatchLocation(){
    return this.http.get('https://localhost:7009/Location/GetAllLocation');
  }
  getAssessmentTypes(){
    return this.http.get('https://localhost:7009/api/AssessmentType');
  }
  createNewBatch(body:any){
    return this.http.post('https://localhost:7009/Batch/CreateNewBatch',body);
  }
  getBatchCount(){
    return this.http.get('');
  }
  getBatchProgram(){
    return this.http.get('https://localhost:7009/api/BatchProgram');
  }
}


