import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user = new User();
  username:string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserByUsername();

  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.user = res;
        console.log(this.user);
      });
    }

  getProfile(){
    if(this.user.role == 'ROLE_PATIENT'){
      this.router.navigate(['patient/profile']);
    }else{
      this.router.navigate(['user/profile']);
    }
  }
  isPatient(){
    return this.user.role == 'ROLE_PATIENT';
  }
  isDoctor(){
    return this.user.role == 'ROLE_MEDECIN';
  }
  isAdmin(){
    return this.user.role == 'ROLE_ADMIN';
  }
  isAideSoignant(){
    return this.user.role == 'ROLE_AIDE_SOIGNANT';
  }
}
