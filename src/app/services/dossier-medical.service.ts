import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {

  constructor(private httpClient:HttpClient) { }

  getDMByPatientId(id){
    return this.httpClient.get('http://localhost:9191/service-DM/DM/patient/'+id);
  }
  getPatientByDMId(idDM){
    return this.httpClient.get('http://localhost:9191/service-DM/DM/'+idDM+'/patient');
  }

  getECByDMId(id){
    return this.httpClient.get('http://localhost:9191/service-DM/DM/'+id+'/EC');
  }

  getConsultationsByDMId(id){
    return this.httpClient.get('http://localhost:9191/service-DM/Consultation/DM/'+id);
  }
  getDMById(id){
    return this.httpClient.get('http://localhost:9191/service-DM/DM/'+id);
  }

  addAntecedentByIdDM(id,data){
    return this.httpClient.post('http://localhost:9191/service-DM/'+id+'/addAnt', data);
  }


  deleteAnt(id){
    return this.httpClient.delete('http://localhost:9191/service-DM/deleteAnt/'+id);
  }

  updateECG(idec,ids){
    return this.httpClient.put('http://localhost:9191/service-EC/EC/'+idec+'/updateG',ids);
  }

  updateECA(idec,ids){
    return this.httpClient.put('http://localhost:9191/service-EC/EC/'+idec+'/updateA',ids);
  }

  updateEC(idec,data){
    return this.httpClient.put('http://localhost:9191/service-EC/EC/'+idec+'/update',data);
  }

}
