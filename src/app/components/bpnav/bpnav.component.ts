import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/app/class/consultation';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-bpnav',
  templateUrl: './bpnav.component.html',
  styleUrls: ['./bpnav.component.css']
})
export class BpnavComponent implements OnInit {
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
      case "32": {
        this.router.navigate(['dm/consultation/'+this.id+'/32/bp']);
        this.notify.emit('hba1c');
        break;
      }
      case "321": {
        this.router.navigate(['dm/consultation/'+this.id+'/321/bp']);
        this.notify.emit('lipid');
        break;
      }
      case "322": {
        this.router.navigate(['dm/consultation/'+this.id+'/322/bp']);
        this.notify.emit('renal');
        break;
     }
      default: {
        this.router.navigate(['dm/consultation/'+this.id+'/32/bp']);
        this.notify.emit('hba1c');
         break;
      }
   }
  }
}
