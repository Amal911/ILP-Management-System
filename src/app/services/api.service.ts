import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getPhases(){
    return this.http.get('https://localhost:7009/Phase/GetAllPhases');
  }
  creatNewPhase(body:any){
    return this.http.post('https://localhost:7009/Phase/AddNewPhase',body)
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
    return this.http.get('https://localhost:7009/AssessmentType/GetAllAssessmentTypes ');
  }
  createNewBatch(body:any){
    return this.http.post('https://localhost:7009/Batch/CreateNewBatch',body);
  }
}
