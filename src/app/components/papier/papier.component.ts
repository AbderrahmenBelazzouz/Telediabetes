import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Antecedent } from 'src/app/class/antecedent';
import { Certificat } from 'src/app/class/certificat';
import { Consultation } from 'src/app/class/consultation';
import { DoseJour } from 'src/app/class/dose-jour';
import { DossierMedical } from 'src/app/class/dossier-medical';
import { ExamenClinique } from 'src/app/class/examen-clinique';
import { Ordonnance } from 'src/app/class/ordonnance';
import { Oriantation } from 'src/app/class/oriantation';
import { Patient } from 'src/app/class/patient';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { DossierMedicalService } from 'src/app/services/dossier-medical.service';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-papier',
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})
export class PapierComponent implements OnInit {

  c = new Consultation();
  dm = new DossierMedical();
  ec = new ExamenClinique();
  p = new Patient();
  id: any;
  username='';
  currentUser = new User();
  certRegistred = false;
  ordRegistred = false;
  oriRegistred = false;

  step='';
  certificat = new Certificat();

  ord = new  Ordonnance();
  doses = new DoseJour();


  ori = new  Oriantation();
  ants = new Array<Antecedent>();

  dateOrd ='';
  dateP = '';
  age = 0;

  state='';

  constructor(private paperService: PaperService, private activatedRoute: ActivatedRoute, private cService: ConsultationService,
    private authService: AuthService, private dmService: DossierMedicalService) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.step = this.activatedRoute.snapshot.params.step;
    this.getUserByUsername()
    this.getC();


  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.currentUser = res;
        if(!(this.isDoctor() || this.isPatient())){
          this.authService.logOut();
        }
      });
    }

    isDoctor(){
      return this.currentUser.role == 'ROLE_MEDECIN';
    }
    isPatient(){
      return this.currentUser.role == 'ROLE_PATIENT';
    }

  getC(){
    this.cService.getCById(this.id).subscribe(
      (res: Consultation )=>{
        this.c = res;
        // get ec by ec.Id
        this.cService.getExamenCliniqueById(this.c.ecId).subscribe(
          (res: ExamenClinique)=>{
            this.ec = res;
            if(this.ec.certificat != null){
              this.certRegistred = true;
              this.getCertificat(this.ec.certificat)
            }
            if(this.ec.ordonnance != null){
              this.ordRegistred = true;
              this.getOrd(this.ec.ordonnance)
            }
            if(this.ec.orientation != null){
              this.oriRegistred = true;
              this.getOri(this.ec.orientation)
            }
            this.getPatientByDMId(this.c.dm.id);
          }
        )
      })
  }

  getPatientByDMId(idDM){
    this.dmService.getPatientByDMId(idDM).subscribe(
      (res: Patient)=>{
        this.p = res;
        this.dateP = this.p.dateNaissance.toString().substring(0,10);
        let timeDiff = Math.abs(Date.now() - new Date(this.p.dateNaissance).getTime());
        this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
        console.log('age ' + this.age)
      })
  }

  recieveMsg($event){
    this.state = $event;
  }

  onNotified(msg: string){
    if(msg=='certificat'){
      this.step="33";
      console.log('certificat')
      this.certificat = new Certificat();
      if(this.ec.certificat != null){
        this.certRegistred = true;
        this.getCertificat(this.ec.certificat);
      }
    }else if(msg=='ordonnance'){
      this.step="331";
      console.log('ordonnance')
      this.ord = new Ordonnance();
      if(this.ec.ordonnance != null){
        this.ordRegistred = true;
        this.getOrd(this.ec.ordonnance);
      }
    }else if(msg=='oriantation'){
      this.step="332";
      console.log('ori')
      this.ori = new Oriantation();
      if(this.ec.orientation != null){
        this.oriRegistred = true;
        this.getOri(this.ec.orientation);
      }
    }
  }

  getCertificat(res){
    this.certificat = res;
    this.dateOrd = this.certificat.createDate.toString().substring(0,10);
  }
  getOrd(res){
    this.ord = res;
    this.doses = this.ord.doses;
    this.dateOrd = this.ord.createDate.toString().substring(0,10);
  }
  getOri(res){
    this.ori = res;
    this.dateOrd = this.ori.createDate.toString().substring(0,10);
    this.dm = this.c.dm;
    this.getAnts();
  }

  getAnts(){
    this.ants=[];
    this.dm.antecedents.forEach(ant => {
      switch(ant.type){
        case ('CHIRURGICAUX'): {
          this.ants.push(ant);
            break;
        }
        case ('MEDICAUX' ): {
          this.ants.push(ant);
            break;
        }
      }
    });
  }


   // add new paper(certificat, ...)
  savepp(){
    switch(this.step){
      case "33": {// certificat
        this.certificat.doctor = this.currentUser.username;
        //get patient
        this.certificat.patient = this.p.nom;
        this.certificat.patientBD = this.p.dateNaissance.toString();

        this.paperService.addCertificat(this.ec.id, this.certificat).subscribe(
          (res: Certificat)=>{
            //auto update ExamenClinique
            alert("Certificat Enregistré avec succee");
            this.getCertificat(res);
            this.certRegistred = true;
          }
        )
        break;
      }
      case "331": {// Ordonnance
        this.ord.doctor = this.currentUser.username;
        //get patient
        this.ord.patient = this.p.nom;

        // create ordonnace
        this.paperService.addOrdonnance(this.ec.id, this.ord).subscribe(
          (res: Ordonnance)=>{
            this.ord = res;
            console.log(this.ord)

            // create rapid + update ord
            this.paperService.addDoses(this.ec.id, this.doses).subscribe(
              (res: DoseJour)=>{
                this.ord.doses = res;
                console.log(this.ord)

                    //auto update ExamenClinique /ord
                    alert("Ordonnance Enregistré avec succee");
                    this.getOrd(this.ord);
                    this.ordRegistred = true;
              })
          })
        break;
     }
     case "332": {// oriantation
      this.ori.doctor = this.currentUser.username;
      //get patient
      this.ori.patient = this.p.nom;
      //get age
      this.ori.agePatient = this.age;

      this.paperService.addOriantation(this.ec.id, this.ori).subscribe(
        (res: Oriantation)=>{
          //auto update ExamenClinique
          alert("Oriantation Enregistré avec succee");
          this.getOri(res);
          this.oriRegistred = true;
        })
      break;
    }
      default: {
        alert("Veuiller refraichir la page");
         break;
      }
    }
  }

  isCertificat(){
    return this.step=="33";
  }
  isOrd(){
    return this.step=="331";
  }
  isOriantation(){
    return this.step=="332";
  }


}
