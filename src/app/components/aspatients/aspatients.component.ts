import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/class/patient';
import { User } from 'src/app/class/user';
import { AideSService } from 'src/app/services/aide-s.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aspatients',
  templateUrl: './aspatients.component.html',
  styleUrls: ['./aspatients.component.css']
})
export class ASpatientsComponent implements OnInit {

  patients = new Array<Patient>();
  username = ''
  user = new User();
  constructor( private asService: AideSService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    this.authService.getUserByUsername(this.username).subscribe(
      (res: User) =>{
        this.user = res;
        if(!(this.isAideSoignant())){
          this.authService.logOut();
        }
        this.getAllPatients()
      });
    }


  getAllPatients(){
    this.asService.getAllPatients().subscribe(
      (res:Patient[])=>{
        this.patients = res;
      }
    )
  }

  isDoctor(){
    return this.user.role == 'ROLE_MEDECIN';
  }
  isAideSoignant(){
    return this.user.role == 'ROLE_AIDE_SOIGNANT';
  }

}
