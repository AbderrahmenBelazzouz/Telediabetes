import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  msg = ''
  user:any;



  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {

  }

  checkLogin() {
    (this.authService.authenticate(this.username, this.password).subscribe(
      data => {
        this.authService.getUserByUsername(this.username).subscribe(
          res =>{
            this.user = res;

            if(this.user.role=='ROLE_PATIENT'){
              this.router.navigate(['patient/dashboard'])
            }else if(this.user.role=='ROLE_MEDECIN'){
              this.router.navigate(['aideSoignant/dashboard'])
            }else if(this.user.role=='ROLE_AIDE_SOIGNANT'){
              this.router.navigate(['aideSoignant/dashboard'])
            }else{
              this.router.navigate(['users'])
            }
            this.invalidLogin = false
          },
          error => {
            this.invalidLogin = true;
            this.msg="Bad Credentials, Please enter valid Username And Password";

          });
      }
    )
    );
  }
}
