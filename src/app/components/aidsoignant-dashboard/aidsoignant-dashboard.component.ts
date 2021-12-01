import { Component, OnInit } from '@angular/core';
import { AideSService } from '../../services/aide-s.service';
import { Consultation } from '../../class/consultation';
import { DossierMedical } from '../../class/dossier-medical';
import { AuthService } from '../../services/auth.service';
import { ExamenClinique } from '../../class/examen-clinique';

import { User } from '../../class/user';
import { DatePipe } from '@angular/common'
import { MedecinService } from '../../services/medecin.service';
import { Patient } from '../../class/patient';
import { DossierMedicalService } from '../../services/dossier-medical.service';

@Component({
  selector: 'app-aidsoignant-dashboard',
  templateUrl: './aidsoignant-dashboard.component.html',
  styleUrls: ['./aidsoignant-dashboard.component.css'],
  providers: [DatePipe]
})
export class AidsoignantDashboardComponent implements OnInit {

  dm = new DossierMedical();
  dms= new Array<DossierMedical>();
  c = new Consultation();
  consultations = new Array<Consultation>();

  ec = new ExamenClinique();
  user= new User();
  username = '';
  date ='';
  time='';
  patients = new Array<Patient>()

  constructor(private medecinService: MedecinService, private aideSservice: AideSService,
    private authService: AuthService, private dmService: DossierMedicalService) { }

  ngOnInit(): void {
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res: User) =>{
        this.user = res;
        if(!(this.isDoctor() || this.isAideSoignant())){
          this.authService.logOut();
        }
        this.dm.description="";
        if(this.isDoctor()) this.getMC()
        else if(this.isAideSoignant()){
          this.getAllDM();
          this.getAllC();
        }
      });
    }

  isDoctor(){
    return this.user.role == 'ROLE_MEDECIN';
  }
  isAideSoignant(){
    return this.user.role == 'ROLE_AIDE_SOIGNANT';
  }

  // create ec
  // create consultation
  addNewC(){
    this.aideSservice.addEC(this.ec).subscribe(
      (res: ExamenClinique)=>{
        this.c.dm = this.dm;
        console.log(this.dm)
        this.c.ecId = res.id;
        this.c.state = 'EN_ATTENTE';
        this.date = this.c.appointmentDate.substring(0,10)
        this.time = this.c.appointmentDate.substring(11,16)
        this.c.appointmentDate = this.date +' - ' + this.time;

        this.aideSservice.addNewC(this.c).subscribe(
          res =>{
            this.getAllC();
          })
      })
  }

  getAllDM(){
    this.aideSservice.getAllDM().subscribe(
      (res : DossierMedical[])=>{
        this.dms = res;
      })
  }

  getPatients(){

    this.consultations = []
    this.medecinService.getPatientsByMedecinId(this.user.id).subscribe(
      (res:Patient[]) =>{
        this.patients = res;
        // get there dm
        this.patients.forEach(element => {
          this.dmService.getDMByPatientId(element.id).subscribe(
            (res:DossierMedical)=>{
              // get there consultations
              this.dmService.getConsultationsByDMId(res.id).subscribe(
                (res:Consultation[])=>{
                  res.forEach(element => {
                    this.consultations.push(element);
                  });
                })
            })
        });
      });
  }

  getMC(){ // only Medecin Consultations
    // getPatients of current Doctor
    this.getPatients();
  }

  getAllC(){ // all consultations
    this.aideSservice.getAllC().subscribe(
      (res : Consultation[])=>{
        this.consultations=[];
        res.forEach(element => {
          //if(element.state!='TERMINER'){ // ne pas afficher les consultation terminées
            this.consultations.push(element);
          // }
        });
      })
  }

  deleteC(id){
    if(confirm("Are you sure to delete ")) {
      this.aideSservice.deleteC(id).subscribe(
        res=>{
          if(this.isAideSoignant()) this.getAllC();
          else if (this.isDoctor()) this.getMC();
        })
    }
  }
}
