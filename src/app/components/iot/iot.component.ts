import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataGluco } from '../../class/data-gluco';
import { IotService } from '../../services/iot.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Patient } from 'src/app/class/patient';
import { DGlyDateResponse } from 'src/app/class/d-gly-date-response';

@Component({
  selector: 'app-iot',
  templateUrl: './iot.component.html',
  styleUrls: ['./iot.component.css']
})
export class IotComponent implements OnInit {

   /*glycemie  = [0.9, 1.10, 1.34, 0.91, 1.16, 0.85, 0.58, 1.09, 1.02, 1.11, 0.97, 0.86, 0.93, 0.88];
  time = ['1/1/2021', '2/1/2021', '3/1/2021', '4/1/2021', '5/1/2021', '6/1/2021', '7/1/2021',
  '8/1/2021', '9/1/2021', '10/1/2021', '11/1/2021', '12/1/2021', '13/1/2021', '14/1/2021'
  ];*/
  glycemie = [];
  time = [];
  min=[]
  max=[]
  date= new Array<string>();
  valuesDateGly = new Array<DGlyDateResponse>();
  value : DGlyDateResponse;

  glycemieTBL : DataGluco[];


  public lineChartData: ChartDataSets[] = [

    { data: this.min, label: 'Min' },
    { data: this.max, label: 'Max' },
    { data: this.glycemie, label: 'Glycemie',fill: false}
  ];
  public lineChartLabels: Label[] = this.time;
  public lineChartOptions: any = { legend:
    { display: true,
      responsive: true,
      scales: {
        yAxes: [{ stacked: true }],
        xAxes: [{ ticks: {  display: false } }]
      }

    }
  };
  public lineChartColors: Array<any> = [
    { // first color
      backgroundColor: '#fff',
    },
    { // second color
      backgroundColor: '#D1F5DD',
    },
    { // 3ed color
      borderColor: '#ff7f00',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#ff7f00',
      pointHoverBackgroundColor: '#EF0A0A',
      pointHoverBorderColor: '#EF0A0A'
    }];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  user: any;
  username:string;
  id: number;
  gly:any;
  constructor(private iotService: IotService, private authService:AuthService,
              private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    //console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      res =>{
        this.user = res;
        this.userService.getPatientById(this.user.id).subscribe(
          (res: Patient)=>{
            this.getGlyData(res.deviceKey);
          })
      });
  }
/*
  getData(){
    this.iotService.getAllData().subscribe(
      (res: DataGluco[]) =>{
        this.glycemieTBL = res;
        for (let index = 0; index < this.glycemieTBL.length; index++) {
          this.glycemie[index] = this.glycemieTBL[index].value;
          this.time[index] = this.glycemieTBL[index].dateEnregistrement;
          this.min[index]=0.7;
          this.max[index]=1.21;
        }
        console.log(this.min)
        //console.log(this.glycemieTBL);
      });
  }*/

  getGlyData(deviceKey){
    this.iotService.getGlyByDeviceKey(deviceKey).subscribe(
      (res: DataGluco[]) =>{
        // get data glycemie
        this.glycemieTBL = res;
        // store distinct dates in "date"
        this.date = this.glycemieTBL.map(item => item.dateEnregistrement)
        .filter((value, index, self) => self.indexOf(value) === index)

        // for each glycemie
        for (let index = 0; index < this.glycemieTBL.length; index++) {
          this.glycemie[index] = this.glycemieTBL[index].value;
          this.time[index] = this.glycemieTBL[index].dateEnregistrement.substring(5,10);
          this.min[index]=70;
          this.max[index]=121;
        }


        for (let index = 0; index < this.date.length; index++) {
          this.iotService.getValuesByDate(deviceKey, this.date[index]).subscribe(
            (res: DataGluco[])=>{
              this.value = new DGlyDateResponse();
              this.value.date = this.date[index];
              this.value.values = res;

              this.valuesDateGly[index]=this.value;
            })
        }
        console.log(this.valuesDateGly)
      });
  }


  addGlytoPatient(){ // how to get the data !?
  // link idp to generated data from iot
    this.iotService.linkPatientToData(this.user.id).subscribe(
      (res)=>{
        console.log(res);
        this.router.navigate(['patient/dashboard']);
      })
  }
}
