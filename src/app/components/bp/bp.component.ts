import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BilanLipidique } from 'src/app/class/bilan-lipidique';
import { Consultation } from 'src/app/class/consultation';
import { Hba1c } from 'src/app/class/hba1c';
import { Renal } from 'src/app/class/renal';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';

@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {

  bpHba1cs = new Array<Hba1c>();
  bprenals = new Array<Renal>();
  bplipids = new Array<BilanLipidique>();
  hba1c: Hba1c;
  renal: Renal;
  lipidique: BilanLipidique;
  bpIds : number[];
  c = new Consultation();
  id: any;
  username='';
  currentUser = new User();
  trouve = false;
  i=0;
  table = new Array<any>();
  state=''

  step:any;
  constructor(private activatedRoute: ActivatedRoute, private cService: ConsultationService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.step = this.activatedRoute.snapshot.params.step;
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

  onNotified(msg: string){
    if(msg=='hba1c'){
      this.step="32";
      this.hba1c = new Hba1c();
      this.getHba1c();

    }else if(msg=='lipid'){
      this.step="321";
      this.lipidique = new BilanLipidique();
      this.getLipid();

    }else if(msg=='renal'){
      this.step="322";
      this.renal = new Renal();
      this.getRenal();
    }
  }


  getC(){
    this.cService.getCById(this.id).subscribe(
      (res: Consultation )=>{
        this.c = res;
        this.bpIds = this.c.bpId;
      })
  }



  // bilan paraclinique affichage
  isIncluded(res){
    this.table = [];
    this.trouve = false;
    this.i=0;
    while(!this.trouve && this.i<res.length){
      if(this.bpIds.includes(res[this.i].id)){
        this.trouve=true;
        this.table.push(res[this.i]);
      }else this.i++;
    }
  }
  getHba1c(){
    this.cService.getHba1cs().subscribe(
      (res:Hba1c[])=>{
        this.isIncluded(res)
        this.bpHba1cs = this.table;
      }
    )
  }
  getRenal(){
    this.cService.getrenals().subscribe(
      (res:Renal[])=>{
        this.isIncluded(res)
        this.bprenals = this.table;
      }
    )
  }
  getLipid(){
    this.cService.getBLs().subscribe(
      (res:BilanLipidique[])=>{
        this.isIncluded(res)
        this.bplipids = this.table;
      }
    )
  }


  isHba1c(){
    return this.step=="32";
  }
  isLipidique(){
    return this.step=="321";
  }
  isRenal(){
    return this.step=="322";
  }

  updateCBp(ids){
    this.cService.updateConsultationBp(this.c.id, ids).subscribe(
      (res : Consultation)=>{
      }
    )
  }

   // add new Bilan
  // update Consultation
  savebp(){
    console.log(this.step);
    switch(this.step){
      case "32": {// hba1c
        this.hba1c.titre='Bilan Hba1c'
        this.cService.addHba1c(this.hba1c).subscribe(
          (res: Hba1c)=>{
            //update consultation
            this.bpIds.push(res.id);
            this.updateCBp(this.bpIds);
            this.vider('hba1c');
            alert("Bilan Hba1c Enregistré avec succee");
            this.getHba1c();
          }
        )
        break;
      }
      case "321": {
        console.log('lipidique');
        this.lipidique.titre='Bilan Lipidique'
        this.cService.addLipidique(this.lipidique).subscribe(
          (res: BilanLipidique)=>{
            //update consultation
            this.bpIds.push(res.id);
            this.updateCBp(this.bpIds);
            this.vider('lipid');
            alert("Bilan Lipidique Enregistré avec succee");
            this.getLipid();          }
        )
        break;
      }
      case "322": {
        this.renal.titre='Bilan Rénal'
        this.cService.addRenal(this.renal).subscribe(
          (res: Renal)=>{
            //update consultation
            this.bpIds.push(res.id);
            this.updateCBp(this.bpIds);
            this.vider('renal');
            alert("Bilan Rénal Enregistré avec succee");
            this.getRenal();
          }
        )
        break;
     }
      default: {
        alert("Veuiller refraichir la page");
         break;
      }
    }
  }

  vider(type){
    switch(type){
      case "hba1c": {
        this.hba1c.id = null;
        this.hba1c.hemoglobine_glyquee='';
        this.hba1c.glycemie_a_jeun='';
        break;
      }
      case "lipid": {
        this.lipidique.id = null;
        this.lipidique.cholesterolTotal='';
        this.lipidique.creatinine='';
        this.lipidique.hdlCholesterol = '';
        this.lipidique.ldlCholesterol='';
        this.lipidique.triglycerides='';
        break;
      }
      case "renal": {
        this.renal.id = null;
        this.renal.glucose='';
        this.renal.leucocytes='';
        this.renal.nitrites = '';
        this.renal.pH='';
        this.renal.proteines='';
        this.renal.sang='';
        this.renal.urobilinogene='';
        break;
     }
    }
  }



    isDoctor(){
      return this.currentUser.role == 'ROLE_MEDECIN';
    }
    isPatient(){
      return this.currentUser.role == 'ROLE_PATIENT';
    }

    isTerminer(){
      return this.c.state != 'TERMINER';
    }
}
