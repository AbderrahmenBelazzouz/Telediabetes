import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Consultation } from '../../class/consultation';
import { DossierMedical } from '../../class/dossier-medical';
import { Patient } from '../../class/patient';
import { User } from '../../class/user';
import { AuthService } from '../../services/auth.service';
import { DossierMedicalService } from '../../services/dossier-medical.service';
import { MedecinService } from '../../services/medecin.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {


  csjrs = []
  csM = []
  csA = []
  tempsjrs= new Array<string>();
  tempsM=[]
  tempsA=[]

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
       yAxes: [{
         ticks: {
          beginAtZero: true
        }
      }]
    },

    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Consultations' },
  ];





  gender = []
  age = []
  type = []

  // pie chart sexe
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Homme', 'Femme'];
  public pieChartLabelsAge: Label[] = ['-18', '18<,<30', '+30'];
  public pieChartLabelsType: Label[] = ['Type 1', 'Type 2'];
  public pieChartData: number[] = this.gender;
  public pieChartDataAge: number[] = this.age;
  public pieChartDataType: number[] = this.type;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['#77F5EA', 'rgba(255,0,0,0.3)','#8B53F3'],
    },
  ];








  timeFilter ='';
  patientFilter='';

  user = new User();
  username:string;
  patients = new Array<Patient>()


  homme=0;
  femme=0;
  l18=0;
  g30=0;
  btw=0;
  type1=0;
  type2=0;
  jrs=new Array<string>()
  m=new Array<string>()
  a=new Array<string>()

  cjrs = new Array<number>()

  cM = new Array<number>()

  cA = new Array<number>()


  consultations = new Array<Consultation>()

  constructor(private authService: AuthService, private medecinService: MedecinService,
    private dmService: DossierMedicalService) { }

  ngOnInit(): void {
    this.getUserByUsername();
  }


  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res: User) =>{
        this.user = res;
        if(this.user.role !='ROLE_MEDECIN'){
          this.authService.logOut();
        }
        this.getPatients();
      });
  }


   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  getPatients(){
    this.tempsjrs=[]
    this.tempsM=[]
    this.tempsA=[]
    this.csjrs = []
    this.csM = []
    this.csA = []
    this.medecinService.getPatientsByMedecinId(this.user.id).subscribe(
      (res:Patient[]) =>{
        this.patients = res;
        this.patients.forEach(element => {

          // consultations
          this.dmService.getDMByPatientId(element.id).subscribe(
            (res:DossierMedical)=>{
              // get there consultations
              this.dmService.getConsultationsByDMId(res.id).subscribe(
                (res:Consultation[])=>{
                  res.forEach(element => {
                    this.consultations.push(element);
                    if(!this.tempsjrs.includes(element.appointmentDate.substring(0,10))){
                      this.tempsjrs.push(element.appointmentDate.substring(0,10));
                    }
                    if(!this.tempsM.includes(element.appointmentDate.substring(0,7))){
                      this.tempsM.push(element.appointmentDate.substring(0,7));
                    }
                    if(!this.tempsA.includes(element.appointmentDate.substring(0,4))){
                      this.tempsA.push(element.appointmentDate.substring(0,4));
                    }
                    let index = this.tempsjrs.indexOf(element.appointmentDate.substring(0,10));
                    this.csjrs[index] = this.updateN(this.csjrs[index]);
                    index = this.tempsM.indexOf(element.appointmentDate.substring(0,7));
                    this.csM[index] = this.updateN(this.csM[index]);
                    index = this.tempsA.indexOf(element.appointmentDate.substring(0,4));
                    this.csA[index] = this.updateN(this.csA[index]);
                  });
                });

            });


          // sexe
          if(element.sexe =='HOMME'){
            this.homme++
          }else this.femme++

          // diabete type
          if(element.type == 'TYPE_1'){
            this.type1++
          }else this.type2++

          // age
          if(element.age < 18){
            this.l18++
          }else if(element.age > 30){
            this.g30++
          }else this.btw++

        });

        this.jrs=this.tempsjrs
        this.m=this.tempsM
        this.a=this.tempsA
        this.cjrs=this.csjrs
        this.cM=this.csM
        this.cA=this.csA

        this.barChartLabels= this.jrs;
        this.barChartData = [{ data: this.cjrs, label: 'Consultations' },]

        this.gender = [this.homme,this.femme];
        this.age = [this.l18, this.btw, this.g30];
        this.type=[this.type1,this.type2]
        this.pieChartData= this.gender;
        this.pieChartDataAge= this.age;
        this.pieChartDataType= this.type;
      });
  }

  updateN(n){
    if(n>=0) n++;
    else n=1;
    return n;
  }



  onChange(filter) {
    //update consultation state
    this.timeFilter=filter;
    switch(this.timeFilter){
      case 'JOURS': {
          // day
          this.barChartLabels= this.jrs;
          this.barChartData = [{ data: this.cjrs, label: 'Consultations' },]
          break;
      }
      case 'MOIS': {
          // month
          this.barChartLabels= this.m;
          this.barChartData = [{ data: this.cM, label: 'Consultations' },]
          break;
        }
        case 'ANNEE': {
          // year
          this.barChartLabels= this.a;
          this.barChartData = [{ data: this.cA, label: 'Consultations' },]
          break;
        }
      }
  }
}
