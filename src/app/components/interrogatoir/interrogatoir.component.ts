import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/app/class/consultation';
import { Element } from 'src/app/class/element';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
@Component({
  selector: 'app-interrogatoir',
  templateUrl: './interrogatoir.component.html',
  styleUrls: ['./interrogatoir.component.css']
})
export class InterrogatoirComponent implements OnInit {
  id : any;
  c = new Consultation();
  ele = new Element()
  eles = new Array<Element>();
  username='';
  currentUser = new User();
  state=''

  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute, private cService: ConsultationService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.getUserByUsername();
          this.getC();
  }

  getC(){
    this.cService.getCById(this.id).subscribe(
      (res: Consultation )=>{
        this.c = res;
        this.eles = this.c.motifs;
      }
    )
  }

  addMotif(){
    this.cService.addMotif(this.c.id,this.ele).subscribe(
      (res : Element)=>{
        this.getC();
        this.vider();
      }
    )

  }

  delete(ide){
    this.cService.deleteElement(ide).subscribe(
      res =>{
        this.getC();
      }
    )
  }

  vider(){
    this.ele.id=null;
    this.ele.nom='';
    this.ele.remarque='';
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

    isTerminer(){
      return this.state==='Terminer';
    }

    recieveMsg($event){
      this.state = $event;
    }


}
