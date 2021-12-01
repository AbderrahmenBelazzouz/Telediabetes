import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  constructor(private httpClient:HttpClient) { }

  getPatientsByMedecinId(id){
    return this.httpClient.get('http://localhost:9191/service-auth/users/medecin/'+id+'/patients');
  }

  getConsultationById(id){
    return this.httpClient.get('http://localhost:9191/service-DM/Consultation/'+id);
  }
}
