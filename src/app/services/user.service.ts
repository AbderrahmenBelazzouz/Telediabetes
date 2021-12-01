import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getUsers(){
    return this.httpClient.get('http://localhost:9191/service-auth/users');
  }
  getUserById(id){
    return this.httpClient.get('http://localhost:9191/service-auth/Admin/users/'+id);
  }
  getPatientById(id){
    return this.httpClient.get('http://localhost:9191/service-auth/users/patient/'+id);
  }

  addUser(data){
    return this.httpClient.post('http://localhost:9191/service-auth/register',data);
  }

  deleteUser(id){
    return this.httpClient.delete('http://localhost:9191/service-auth/users/delete/'+id);
  }

  updateUser(id, data){
    return this.httpClient.put('http://localhost:9191/service-auth/users/update/'+id,data);
  }

  updatePatient(id, data){
    return this.httpClient.put('http://localhost:9191/service-auth/users/patient/update/'+id,data);
  }

  addGlyToPatient(idp,idg){
    return this.httpClient.post('http://localhost:9191/service-auth/users/patient/{idp}/addGly/{idg}',null);
  }
}
