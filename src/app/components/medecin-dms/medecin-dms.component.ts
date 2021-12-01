import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MedecinService } from '../../services/medecin.service';

@Component({
  selector: 'app-medecin-dms',
  templateUrl: './medecin-dms.component.html',
  styleUrls: ['./medecin-dms.component.css']
})
export class MedecinDMSComponent implements OnInit {

  user: any;
  username:string;
  patients : any;

  constructor(private authService: AuthService, private medecinService: MedecinService) { }

  ngOnInit(): void {
    this.getUserByUsername();

  }

  getPatients(){
    this.medecinService.getPatientsByMedecinId(this.user.id).subscribe(
      res =>{
        this.patients = res;
        console.log(this.patients);
      });
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      res =>{
        this.user = res;
        if(this.user.role !='ROLE_MEDECIN'){
          this.authService.logOut();
        }
        this.getPatients();
      });
  }

}
