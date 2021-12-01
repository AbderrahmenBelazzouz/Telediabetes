import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultation } from 'src/app/class/consultation';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-navdm',
  templateUrl: './navdm.component.html',
  styleUrls: ['./navdm.component.css']
})
export class NavdmComponent implements OnInit {

  id: any;
  step: any;
  c = new Consultation();
  currentUser = new User();
  username:string;
  state='';

  @Output() messageEvent = new EventEmitter<string>()

  constructor(private authService: AuthService,private router: Router, private medecinService: MedecinService,
              private activatedRoute: ActivatedRoute, private cService: ConsultationService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.step = this.activatedRoute.snapshot.params.step;
    this.getUserByUsername();
    this.getConsultationById();
    this.navigat(this.step);
  }


  onChange(state) {
      //update consultation state
      this.state=state;
      this.cService.updateConsultationState(this.c.id, this.state).subscribe(
        (res:Consultation)=>{
          this.c = res;
          this.messageEvent.emit(state);
        });
      }


  check(){
    if(this.c.state=='EN_ATTENTE'){
      this.state='EN_COURS'
      // update consultation state
      this.cService.updateConsultationState(this.c.id, this.state).subscribe(
        (res:Consultation)=>{
          this.c = res;
          // state Updated to En Cours
        });
    }
  }

  getConsultationById(){
    this.medecinService.getConsultationById(this.id).subscribe(
      (res : Consultation)=>{
        this.c = res;
        this.messageEvent.emit(this.c.state);
        this.check();
      }
    )
  }

  navigat(value){
    switch(value) {
      case "1": {
        this.router.navigate(['dm/consultation/'+this.id+'/1/info']);
         break;
      }
      case "2": {
        this.router.navigate(['dm/consultation/'+this.id+'/2/antecedents']);
         break;
      }
      case "3": {
        this.router.navigate(['dm/consultation/'+this.id+'/3/intero']);
        break;
     }
     case "4": {
      this.router.navigate(['dm/consultation/'+this.id+'/4/bilanDemande']);
        break;
     }
      default: {
          this.router.navigate(['dm/consultation/'+this.id+'/1/info']);
         break;
      }
   }
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.currentUser = res;
      });
    }

    isDoctor(){
      return this.currentUser.role == 'ROLE_MEDECIN';
    }
    isPatient(){
      return this.currentUser.role == 'ROLE_PATIENT';
    }
}
