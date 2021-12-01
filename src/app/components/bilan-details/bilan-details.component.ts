import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BilanLipidique } from 'src/app/class/bilan-lipidique';

import { Consultation } from 'src/app/class/consultation';
import { DossierMedical } from 'src/app/class/dossier-medical';
import { Hba1c } from 'src/app/class/hba1c';
import { Renal } from 'src/app/class/renal';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultationService } from 'src/app/services/consultation.service';
import { DossierMedicalService } from 'src/app/services/dossier-medical.service';

@Component({
  selector: 'app-bilan-details',
  templateUrl: './bilan-details.component.html',
  styleUrls: ['./bilan-details.component.css']
})
export class BilanDetailsComponent implements OnInit {
  dm = new DossierMedical();
  cs = new Array<Consultation>();
  id:number;
  bps: any;

  bpHba1cs = new Array<Hba1c>();
  bprenals = new Array<Renal>();
  bplipids = new Array<BilanLipidique>();
  hba1c = new Hba1c();
  renal = new Renal();
  lipid = new BilanLipidique();
  bpIds : number[];
  c = new Consultation();

  trouve = false;
  i=0;
  bilan : any;

  //---------------------- charts -------------------------------------
  time = [];
  title = '';
  hba1cs= [];
  min=[]
  max=[]
  creatinin =[]
  normal = [];
  equil =[];
  nonEquil=[];

  user: any;


  public lineChartDatahba1c: ChartDataSets[] = [
    { data: this.hba1cs, label: 'HBA1c', fill: false },
    { data: this.normal, label: 'Normal' },
    { data: this.equil, label: 'équilibré' },
    { data: this.nonEquil, label: 'Non équilibré' }
  ];

  public lineChartDatalipid: ChartDataSets[] = [
    { data: this.creatinin, label: 'Creatinine', fill: false  },
    { data: this.min, label: 'min' },
    { data: this.max, label: 'max' },
  ];

  public lineChartLabels: Label[] = this.time;
  public lineChartOptions: any = { legend:
    { display: true,
      responsive: false
    }
  };
  public lineChartColorshba1c: Array<any> = [
    { // hba1c
      borderColor: '#ff7f00',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#ff7f00',
      pointHoverBackgroundColor: '#EF0A0A',
      pointHoverBorderColor: '#EF0A0A'
    },
    { // second color   -normal
      borderColor: '#D2FFFD',
      backgroundColor: '#D2FFFD'
    },
    { // 3ed color  -equilibre
      backgroundColor: '#EDFFF5',
      borderColor: '#EDFFF5'
    },
    { // 4th color  non-equilibre
      backgroundColor: '#FFEDED',
      borderColor: '#FFEDED'
    }];

    public lineChartColorslipid: Array<any> = [
      { // creatinine
        borderColor: '#ff7f00',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ff7f00',
        pointHoverBackgroundColor: '#EF0A0A',
        pointHoverBorderColor: '#EF0A0A'
      },
      { // second color   -min
        borderColor: '#fff',
        backgroundColor: '#fff'
      },
      { // 3ed color  -max
        backgroundColor: '#EDFFF5',
        borderColor: '#EDFFF5'
      }];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  constructor(private activatedRoute: ActivatedRoute,private dmService:DossierMedicalService,
    private cService: ConsultationService, private authService: AuthService) { }


  idbp=0;
  type='hba1c';

  username = ''
  currentUser = new User()



  showHba1c(){

    this.title='hba1c'
    for (let index = 0; index < this.bpHba1cs.length; index++) {
      this.hba1cs[index] = parseFloat(this.bpHba1cs[index].hemoglobine_glyquee);
      this.time[index] = this.bpHba1cs[index].createDate.substring(0,10);
      this.normal[index]=6.2;
      this.equil[index]=7.2;
      this.nonEquil[index]=8;
    }
  }

  showLipid(){

    this.title='creatinine'
    for (let index = 0; index < this.bplipids.length; index++) {
      this.creatinin[index] = parseFloat(this.bplipids[index].creatinine);
      this.time[index] = this.bplipids[index].createDate.substring(0,10);
      this.min[index]=7;
      this.max[index]=14;
    }
  }


//------------------------------------------------------------------------

  ngOnInit(): void {
    //get dm
    this.bpHba1cs = [];
    this.bplipids = [];
    this.bprenals = [];
    this.bpIds=[];
    this.id = this.activatedRoute.snapshot.params.idp;
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    this.authService.getUserByUsername(this.username).subscribe(
      (res: User) =>{
        this.currentUser = res;
        if(!(this.isDoctor() || this.isPatient())){
          this.authService.logOut();
        }
        this.getDM(this.id)
      });
    }

  isDoctor(){
    return this.currentUser.role == 'ROLE_MEDECIN';
  }
  isPatient(){
    return this.currentUser.role == 'ROLE_PATIENT';
  }


  getDM(id){
    this.dmService.getDMByPatientId(id).subscribe(
      (res : DossierMedical)=>{
        this.dm = res;
        console.log(res)
        this.dmService.getConsultationsByDMId(this.dm.id).subscribe(
          (res:Consultation[])=>{
            // get consultations
            this.cs = res;
            this.showListBP(); // default hba1c
          })
      })
  }

  // bilan paraclinique affichage
  isIncluded(res){
    this.bilan = null;
    this.trouve = false;
    this.i=0;
    while(!this.trouve && this.i<res.length){
      if(this.bpIds.includes(res[this.i].id)){
        this.trouve=true;
        this.bilan = res[this.i];
      }else this.i++;
    }
  }

  getHba1c(){
    this.cService.getHba1cs().subscribe(
      (res1:Hba1c[])=>{
        this.cs.forEach(element => {
          this.cService.getCById(element.id).subscribe(
            (res: Consultation )=>{
              this.c = res;
              this.bpIds = this.c.bpId;
              this.isIncluded(res1)
              if(this.bilan != null){
                this.bpHba1cs.push(this.bilan);
                this.sortTbl(this.bpHba1cs);
              }
                this.showHba1c();
            })
        });
      }
    )
  }

  sortTbl(tbl){
    tbl = tbl.sort((n1,n2) => {
      if (n1.createDate > n2.createDate) {
          return 1;
      }
      if (n1.createDate < n2.createDate) {
          return -1;
      }
      return 0;
  });
  }
  getRenal(){
    this.cService.getrenals().subscribe(
      (res1:Renal[])=>{
        this.cs.forEach(element => {
          this.cService.getCById(element.id).subscribe(
            (res: Consultation )=>{
              this.c = res;
              this.bpIds = this.c.bpId;
              this.isIncluded(res1)
              if(this.bilan != null) {
                this.bprenals.push(this.bilan);
                this.sortTbl(this.bprenals);
              }
            })
        });
      }
    )
  }
  getLipid(){
    this.cService.getBLs().subscribe(
      (res1:BilanLipidique[])=>{
        this.cs.forEach(element => {
          this.cService.getCById(element.id).subscribe(
            (res: Consultation )=>{
              this.c = res;
              this.bpIds = this.c.bpId;
              this.isIncluded(res1)
              if(this.bilan != null) {
                this.bplipids.push(this.bilan);
                this.sortTbl(this.bplipids);
              }
              this.showLipid()
            })
        });
      }
    )
  }

  getBP(id, type){
    this.cService.getBpById(id).subscribe(
      (res : any)=>{
        if(type=='hba1c'){
          this.hba1c = res;
          console.log(res)
        }else if(type=='lipid'){
          this.lipid = res;
        }else if(type=='renal'){
          this.renal = res;
        }
        this.type = type;
      }
    )
  }

  navigat(type){
    this.type = type;
    this.bprenals=[];
    this.bplipids=[];
    this.bpHba1cs=[];
    this.showListBP();

  }

  showListBP(){
    switch(this.type){
      case 'hba1c':{
        this.getHba1c();
        break;
      }
      case 'lipid':{
        this.getLipid();
        break;
      }
      case 'renal':{
        this.getRenal();
        break;
      }
      default: {
        this.getHba1c();
         break;
      }
    }
  }
}
