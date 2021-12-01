import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/app/class/consultation';
import { MedecinService } from 'src/app/services/medecin.service';
@Component({
  selector: 'app-ppnav',
  templateUrl: './ppnav.component.html',
  styleUrls: ['./ppnav.component.css']
})
export class PpnavComponent implements OnInit {

  id: any;
  step: any;
  c = new Consultation();
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private medecinService: MedecinService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idc;
    this.step = this.activatedRoute.snapshot.params.step;
    this.getConsultationById();
    this.navigat(this.step);
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
      case "33": {
        this.router.navigate(['dm/consultation/'+this.id+'/33/pp']);
        this.notify.emit('certificat');
        break;
      }
      case "331": {
        this.router.navigate(['dm/consultation/'+this.id+'/331/pp']);
        this.notify.emit('ordonnance');
        break;
      }
      case "332": {
        this.router.navigate(['dm/consultation/'+this.id+'/332/pp']);
        this.notify.emit('oriantation');
        break;
     }
      default: {
        this.router.navigate(['dm/consultation/'+this.id+'/33/pp']);
        this.notify.emit('certificat');
         break;
      }
   }
  }

}
