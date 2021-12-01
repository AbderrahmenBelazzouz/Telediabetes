import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IotService {

  constructor(private httpClient:HttpClient) { }

  getAllData(){
    return this.httpClient.get('http://localhost:9191/service-IOT/iot');
  }

  getGlyByDeviceKey(deviceKey){
    return this.httpClient.get('http://localhost:9191/service-IOT/iot/patient/'+deviceKey);
  }
  getValuesByDate(deviceKey, date){
    return this.httpClient.get('http://localhost:9191/service-IOT/iot/patient/'+deviceKey+'/'+date);
  }

  linkPatientToData(idp){
    return this.httpClient.get('http://localhost:9191/service-IOT/iot/setPatient/'+idp);
  }
}
