import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  authenticate(username, password) {
    return this.httpClient.post<any>('http://localhost:9191/service-auth/authenticate',{username,password}).pipe(
      map(
        userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
        }
      )

    );
  }
  getUserByUsername(username){
    return this.httpClient.get('http://localhost:9191/service-auth/users/get/'+username);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    if(user === null){
      // redirect to login Page
      this.router.navigate(['']);
    }
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.router.navigate(['']);
  }
}
