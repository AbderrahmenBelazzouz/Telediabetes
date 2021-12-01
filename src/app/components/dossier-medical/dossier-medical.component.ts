import { Component, OnInit } from '@angular/core';
import { Antecedent } from '../../class/antecedent';
import { DossierMedical } from '../../class/dossier-medical';
import { DossierMedicalService } from '../../services/dossier-medical.service';
import { AuthService } from '../../services/auth.service';
import { Consultation } from 'src/app/class/consultation';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/class/patient';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {

  patient = new Patient()
  username ="";
  dm = new DossierMedical();
  ant : Antecedent[];
  fm = new  Array<Antecedent>();
  ch = new  Array<Antecedent>();
  ha = new  Array<Antecedent>();
  md = new  Array<Antecedent>();
  cs = new Array<Consultation>();
  id = 0;
  currentUser = new User();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService,
     private authService: AuthService,private dmService:DossierMedicalService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idp;
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    this.authService.getUserByUsername(this.username).subscribe(
      (res: User) =>{
        this.currentUser = res;
        if(!(this.isDoctor() || this.isPatient())){
          this.authService.logOut();
        }
        this.getP();
      });
    }

  isDoctor(){
    return this.currentUser.role == 'ROLE_MEDECIN';
  }
  isPatient(){
    return this.currentUser.role == 'ROLE_PATIENT';
  }
  getDM(id){
    this.dmService.getDMByPatientId(id).subscribe(
      (res : DossierMedical)=>{
        this.dm = res;
        console.log(res)
        this.dmService.getConsultationsByDMId(this.dm.id).subscribe(
          (res:Consultation[])=>{
            this.cs = res;
            this.getAnt();
          })
      })
  }

  getP(){
    if(this.isPatient()){
      this.getDM(this.currentUser.id);

    }else if(this.isDoctor()){
      console.log(this.id);
      this.userService.getPatientById(this.id).subscribe(
        (res: Patient)=>{
          this.patient = res;
          console.log(res);
          this.getDM(this.patient.id);
        })
    }
  }



  getAnt(){
    this.dm.antecedents.forEach(element => {
      switch(element.type) {
        case "CHIRURGICAUX": {
           this.ch.push(element);
           break;
        }
        case "FAMILIAUX": {
           this.fm.push(element);;
           break;
        }
        case "HABITUDES": {
          this.ha.push(element);
          break;
       }
       case "MEDICAUX": {
          this.md.push(element);;
          break;
       }
        default: {
           break;
        }
      }
    });
  }

  goToBilans(){
    this.router.navigate(['patient/'+this.id+'/dossierMedical/bpDetails']);
  }
  goToIot(){
    if(this.isDoctor()) this.router.navigate(['medecin/'+this.id+'/iot']);
    else if(this.isPatient()) this.router.navigate(['patient/dashboard'])
  }
}
