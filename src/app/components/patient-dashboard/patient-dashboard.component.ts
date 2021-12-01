import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  user = new User();
  username:string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserByUsername();

  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res: User) =>{
        this.user = res;
        if(this.user.role !='ROLE_PATIENT'){
          this.authService.logOut();
        }
      });
  }



}
