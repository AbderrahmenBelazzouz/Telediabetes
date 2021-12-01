import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { Patient } from '../../class/patient';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  patient= new Patient();
  username='';
  user = new User();

  constructor(private authService: AuthService,private userService: UserService) { }

  ngOnInit(): void {
    this.getUserByUsername();

  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')

    this.authService.getUserByUsername(this.username).subscribe(
      (res:User) =>{
        this.user = res;
        if(this.user.role !='ROLE_PATIENT'){
          this.authService.logOut();
        }
        this.userService.getPatientById(this.user.id).subscribe(
          (res: Patient)=>{
            this.patient = res;
          })
      });
  }
}
