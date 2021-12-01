import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private httpClient:HttpClient) { }

  getCById(id){
    return this.httpClient.get('http://localhost:9191/service-DM/Consultation/'+id);
  }

  addMotif(idc, data){
    return this.httpClient.post('http://localhost:9191/service-DM/Consultation/'+idc+'/addMotif',data);
  }
  addele(data){
    return this.httpClient.post('http://localhost:9191/service-DM/ele/add',data);
  }

  getElementById(ide){
    return this.httpClient.get('http://localhost:9191/service-DM/ele/'+ide);
  }

  deleteElement(ide){
    return this.httpClient.delete('http://localhost:9191/service-DM/ele/delete/'+ide);
  }

  getExamenCliniqueById(id){
    return this.httpClient.get('http://localhost:9191/service-EC/EC/'+id);
  }

  addHba1c(data){
    return this.httpClient.post('http://localhost:9004/addHbA1c',data);
  }

  getHba1cs(){
    return this.httpClient.get('http://localhost:9004/hbA1cs');
  }
  getrenals(){
    return this.httpClient.get('http://localhost:9004/rénals');
  }
  getBLs(){
    return this.httpClient.get('http://localhost:9004/BLs');
  }
  getBpById(idpb){
    return this.httpClient.get('http://localhost:9004/BP/'+idpb);
  }

  addLipidique(data){
    return this.httpClient.post('http://localhost:9004/addBL',data);
  }
  addRenal(data){
    return this.httpClient.post('http://localhost:9004/addRénal',data);
  }

  updateConsultationBp(idc, ids){
      return this.httpClient.put('http://localhost:9191/service-DM/Consultation/'+idc+'/updateBP',ids);
  }

  updateConsultationState(idc, state){
    return this.httpClient.put('http://localhost:9191/service-DM/Consultation/'+idc+'/updateState',state);
  }

}
