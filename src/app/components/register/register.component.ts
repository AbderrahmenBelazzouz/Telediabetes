import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../class/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  u:any;
  pat='ROLE_PATIENT'
  med='ROLE_MEDECIN'
  admin='ROLE_ADMIN'
  ais='ROLE_AIDE_SOIGNANT'
  a='ACTIVE'
  ina='INACTIVE'
  username='';

  currentUser = new User();

  constructor( private authService: AuthService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    this.authService.getUserByUsername(this.username).subscribe(
      (res:User) =>{
        this.currentUser = res;
        if(this.currentUser.role !='ROLE_ADMIN'){
          this.authService.logOut();
        }
      });
  }


  registerUser(){
    this.userService.addUser(this.user).subscribe(
      res =>{
        this.u = res;
        //console.log();
        alert("User created succesfully");
        this.router.navigate(['users']);
      });
  }

}
