import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/app/class/consultation';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-ec-nav',
  templateUrl: './ec-nav.component.html',
  styleUrls: ['./ec-nav.component.css']
})
export class EcNavComponent implements OnInit {
  id: any;
  step: any;
  c = new Consultation();
  user = new User();
  username:string;

  constructor(private authService: AuthService, private router: Router, private medecinService: MedecinService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.step = this.activatedRoute.snapshot.params.step;
    this.getConsultationById();
    this.navigat(this.step);
    this.getUserByUsername();
  }

  getConsultationById(){
    this.medecinService.getConsultationById(this.id).subscribe(
      (res : Consultation)=>{
        this.c = res;
      }
    )
  }

  navigat(value){
    switch(value) {
      case "3": {
        this.router.navigate(['dm/consultation/'+this.id+'/3/intero']);
         break;
      }
      case "31": {
        this.router.navigate(['dm/consultation/'+this.id+'/31/ec']);
         break;
      }
      case "32": {
        this.router.navigate(['dm/consultation/'+this.id+'/32/bp/hba1c']);
        break;
     }
     case "33": {
      this.router.navigate(['dm/consultation/'+this.id+'/33/pp/certificat']);
        break;
     }
      default: {
          this.router.navigate(['dm/consultation/'+this.id+'/3/intero']);
         break;
      }
   }
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.user = res;
        console.log(this.user);
      });
    }

    isPatient(){
      return this.user.role == 'ROLE_PATIENT';
    }
    isDoctor(){
      return this.user.role == 'ROLE_MEDECIN';
    }

}
