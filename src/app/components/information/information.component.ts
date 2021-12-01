import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Patient } from '../../class/patient';
import { Consultation } from '../../class/consultation';
import { DossierMedical } from '../../class/dossier-medical';
import { UserService } from '../../services/user.service';
import { DossierMedicalService } from '../../services/dossier-medical.service';
import { ConsultationService } from '../../services/consultation.service';
import { User } from '../../class/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  id : any;
  c = new Consultation();
  dm = new DossierMedical();
  p = new Patient();
  user = new User();
  username = '';
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private cService: ConsultationService,
              private dmService: DossierMedicalService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.getC();
    this.getUserByUsername()
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.user = res;
        if(this.user.role !='ROLE_MEDECIN'){
          this.authService.logOut();
        }
      });
    }

  getC(){
    this.cService.getCById(this.id).subscribe(
      (res: Consultation )=>{
        this.c = res;
        console.log(this.c.dm.id);
        this.getPatientByDMId(this.c.dm.id);
      }
    )
  }

  getPatientByDMId(idDM){
    this.dmService.getPatientByDMId(idDM).subscribe(
      (res: Patient)=>{
        this.p = res;
        console.log(this.p);
      }
    )

  }
}
