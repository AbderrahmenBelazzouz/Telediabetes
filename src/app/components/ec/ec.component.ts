import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Element } from 'src/app/class/element';
import { ConsultationService } from 'src/app/services/consultation.service';
import { Consultation } from '../../class/consultation';
import { ExamenClinique } from '../../class/examen-clinique';
import { User } from '../../class/user';
import { AuthService } from '../../services/auth.service';
import { DossierMedicalService } from '../../services/dossier-medical.service';

@Component({
  selector: 'app-ec',
  templateUrl: './ec.component.html',
  styleUrls: ['./ec.component.css']
})
export class EcComponent implements OnInit {
  id : any;
  c = new Consultation();
  ec = new ExamenClinique();
  eleg = new Element();
  elea = new Element();
  ele = new Element();
  elesg = new Array<number>();
  elesa = new Array<number>();
  general = new Array<Element>();
  appareil = new Array<Element>();
  index:number;
  username='';
  currentUser = new User();
  state=''

  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute, private cService: ConsultationService
    , private dmService: DossierMedicalService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.getUserByUsername();
      this.getC();
  }
  recieveMsg($event){
    this.state = $event;
  }

  getC(){
    this.cService.getCById(this.id).subscribe(
      (res: Consultation )=>{
        this.c = res;
        this.cService.getExamenCliniqueById(this.c.ecId).subscribe(
          (res : ExamenClinique)=>{
            this.ec = res;
            this.getdata();
          }
        )
      }
    )
  }

  getdata(){
    this.getG();
    this.getA();
  }

  getG(){
    this.general = [];
    this.ec.general.forEach(element => {
      this.cService.getElementById(element).subscribe(
        (res:Element) =>{
          this.general.push(res);
        }
      )
    });
  }
  getA(){
    this.appareil = [];
    this.ec.appareil.forEach(element => {
      this.cService.getElementById(element).subscribe(
        (res:Element) =>{
          this.appareil.push(res);
    });
  })
}

  // add new Element
  // update EC
  addElement(type){
    if(type=='g') {
      this.cService.addele(this.eleg).subscribe(
        (res : Element)=>{
           this.general.push(res);
           this.elesg = [];/// remplir eles et update ec
           this.general.forEach(element => {
           this.elesg.push(element.id);
          });
          this.updateECG(this.elesg);
        }
      )
    }else if(type=='a') {
      this.cService.addele(this.elea).subscribe(
        (res : Element)=>{
          this.appareil.push(res);
           this.elesa = [];/// remplir eles et update ec
           this.appareil.forEach(element => {
           this.elesa.push(element.id);
        })
           this.updateECA(this.elesa);
      })
  }
}

  updateECA(ids){
    console.log('id = '+ ids);
    this.dmService.updateECA(this.ec.id, ids).subscribe(
      (res : ExamenClinique)=>{
        console.log(res);
        this.vider(this.elea)
        this.getC();

      }
    )
  }
  updateECG(ids){
    console.log('id = '+ ids);
    this.dmService.updateECG(this.ec.id, ids).subscribe(
      (res : ExamenClinique)=>{
        console.log(res);
        this.vider(this.eleg)
        this.getC();

      }
    )
  }



  delete(ide, type){

    this.cService.deleteElement(ide).subscribe(
      res =>{
        if(type=='g'){
          console.log(this.elesg);
          this.index = this.elesg.indexOf(ide);
          this.elesg.splice(this.index, 1); // remove ele from list
          this.general.splice(this.index, 1);
          console.log(this.elesg);

          this.updateECG(this.elesg);
        }else{
          this.index = this.elesa.indexOf(ide);
          this.elesa.splice(this.index, 1); // remove ele from list
          this.appareil.splice(this.index, 1);
          this.updateECA(this.elesa);
        }
        this.getC();
      }
    )
  }


  vider(ele){
    ele.id=null;
    ele.nom='';
    ele.remarque='';
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
}
