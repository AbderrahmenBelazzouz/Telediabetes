import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AideSService {

  constructor(private httpClient:HttpClient) { }

  getAllDM(){
    return this.httpClient.get('http://localhost:9191/service-DM/DM');
  }
  getAllC(){
    return this.httpClient.get('http://localhost:9191/service-DM/Consultation');
  }

  getAllPatients(){
    return this.httpClient.get('http://localhost:9191/service-auth/aideS/patients');
  }

  getAllMedecins(){
    return this.httpClient.get('http://localhost:9191/service-auth/aideS/medecins');
  }

  addNewDM(data){
    return this.httpClient.post('http://localhost:9191/service-DM/DM/add',data);
  }

  addEC(data){
    return this.httpClient.post('http://localhost:9191/service-EC/EC/add',data);
  }

  addNewC(data){
    return this.httpClient.post('http://localhost:9191/service-DM/Consultation/add',data);
  }
  deleteC(id){
    return this.httpClient.delete('http://localhost:9191/service-DM/Consultation/delete/'+id);
  }
  updateM(id, data){
    return this.httpClient.put('http://localhost:9191/service-auth/aideS/update/'+id,data);
  }
}
