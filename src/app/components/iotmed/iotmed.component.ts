import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DGlyDateResponse } from 'src/app/class/d-gly-date-response';
import { DataGluco } from 'src/app/class/data-gluco';
import { Patient } from 'src/app/class/patient';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { IotService } from 'src/app/services/iot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-iotmed',
  templateUrl: './iotmed.component.html',
  styleUrls: ['./iotmed.component.css']
})
export class IotmedComponent implements OnInit {

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

  patient = new Patient();
  idp: number;
  gly:any;
  user = new User();
  username = '';
  constructor(private authService: AuthService, private iotService: IotService,private activatedRoute:ActivatedRoute,
              private userService:UserService) { }

  ngOnInit(): void {
    this.idp = this.activatedRoute.snapshot.params.idp;
    this.getPatient();
    this.getUserByUsername()
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.user = res;
        if(this.user.role !='ROLE_MEDECIN'){
          this.authService.logOut();
        }
      });
    }

  getPatient(){
  this.userService.getPatientById(this.idp).subscribe(
    (res: Patient)=>{
      this.patient =res;
      this.getGlyData(this.patient.deviceKey);
    })
  }

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

}
