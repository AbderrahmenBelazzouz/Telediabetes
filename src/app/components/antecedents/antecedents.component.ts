import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Antecedent } from 'src/app/class/antecedent';
import { Consultation } from 'src/app/class/consultation';
import { DossierMedical } from 'src/app/class/dossier-medical';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { DossierMedicalService } from 'src/app/services/dossier-medical.service';

@Component({
  selector: 'app-antecedents',
  templateUrl: './antecedents.component.html',
  styleUrls: ['./antecedents.component.css']
})
export class AntecedentsComponent implements OnInit {

  f = new Array<Antecedent>();
  ch = new Array<Antecedent>();
  m = new Array<Antecedent>();
  h = new Array<Antecedent>();
  ants = new Array<Antecedent>();

  antH = new Antecedent();
  antM = new Antecedent();
  antCH = new Antecedent();
  antF = new Antecedent();
  ant = new Antecedent();

  id : any;
  c = new Consultation();
  dm = new DossierMedical();

  state=''
  username=''
  currentUser= new User();

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
        this.dm = this.c.dm;
        this.getAnts();
      })
  }

  getAnts(){
    this.f=[]; this.ch=[]; this.m=[]; this.h=[];
    this.dm.antecedents.forEach(ant => {

      switch(ant.type){
        case 'FAMILIAUX': {
          this.f.push(ant);
          break;
      }
      case 'CHIRURGICAUX': {
        this.ch.push(ant);
          break;
      }
      case 'MEDICAUX': {
        this.m.push(ant);
        break;
    }
    case 'HABITUDES': {
      this.h.push(ant);
        break;
    }
  }
 });
}

  addAntecedent(type){
      switch(type){
          case 'f': {
            this.antF.type = 'FAMILIAUX';
            this.ant = this.antF;

            break;
        }
        case 'ch': {
          this.antCH.type = 'CHIRURGICAUX';
          this.ant = this.antCH;

            break;
        }
        case 'm': {
          this.antM.type = 'MEDICAUX';
          this.ant = this.antM;

          break;
      }
      case 'h': {
        this.antH.type = 'HABITUDES';
        this.ant = this.antH;

          break;
      }
    }
    this.dmService.addAntecedentByIdDM(this.dm.id, this.ant).subscribe(
      res=>{
        this.vider(this.antF);
        this.vider(this.antCH);
        this.vider(this.antM);
        this.vider(this.antH);
        this.getC();
      })
  }

  delete(id){
    this.dmService.deleteAnt(id).subscribe(
      res=>{

        this.getC();
      }
    )
  }
  vider(ele){
    ele.id = null;
    ele.nom ='';
    ele.remarque = '';
  }
}
