import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/app/class/consultation';
import { DossierMedical } from 'src/app/class/dossier-medical';
import { Patient } from 'src/app/class/patient';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { DossierMedicalService } from 'src/app/services/dossier-medical.service';

@Component({
  selector: 'app-bilan-dmd',
  templateUrl: './bilan-dmd.component.html',
  styleUrls: ['./bilan-dmd.component.css']
})
export class BilanDmdComponent implements OnInit {

  labo: string;
  srv = 'Diabeto';
  id : any;
  c = new Consultation();
  dm = new DossierMedical();
  p = new Patient();
  username: string;

  prod = '';
  rchDmd = '';
  rslt= '';
  state=''
  currentUser = new User();

  constructor(private activatedRoute: ActivatedRoute, private cService: ConsultationService,
              private dmService: DossierMedicalService, private authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.getUserByUsername()
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.currentUser = res;
        if(this.currentUser.role !='ROLE_MEDECIN'){
          this.authService.logOut();
        }
        this.getC();
      });
    }


  recieveMsg($event){
    this.state = $event;
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
        this.username = sessionStorage.getItem('username');
      }
    )
  }

}
