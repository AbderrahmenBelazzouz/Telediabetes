import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(private httpClient: HttpClient) { }

  addCertificat(idec, data){
    return this.httpClient.post('http://localhost:9191/service-EC/'+idec+'/addCertificat',data);
  }

  addOrdonnance(idec, data){
    return this.httpClient.post('http://localhost:9191/service-EC/'+idec+'/addOrd',data);
  }

  addDoses(idord, data){
    return this.httpClient.post('http://localhost:9191/service-EC/'+idord+'/addDoses',data);
  }

  addOriantation(idec, data){
    return this.httpClient.post('http://localhost:9191/service-EC/'+idec+'/addOrientation',data);
  }





  getCertificats(){
    return this.httpClient.get('http://localhost:9191/service-EC/certificats');
  }

  getCertificatById(id){
    return this.httpClient.get('http://localhost:9191/service-EC/certificatById/'+id);
  }
}
