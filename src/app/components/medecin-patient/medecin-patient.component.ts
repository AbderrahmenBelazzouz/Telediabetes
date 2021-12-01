import { Component, OnInit } from '@angular/core';
import { DossierMedical } from 'src/app/class/dossier-medical';
import { Patient } from 'src/app/class/patient';
import { User } from 'src/app/class/user';
import { AideSService } from 'src/app/services/aide-s.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medecin-patient',
  templateUrl: './medecin-patient.component.html',
  styleUrls: ['./medecin-patient.component.css']
})
export class MedecinPatientComponent implements OnInit {

  p = new Patient();
  patients:Patient[];
  m = new User();
  medecins : User[];
  dms: DossierMedical[];
  dm= new DossierMedical();
  user = new User();
  username = '';
  constructor(private authService: AuthService, private aideSservice: AideSService, private userService: UserService) { }

  ngOnInit(): void {
    this.dm.description="";
    this.m.username="";
    this.p.username="";
    this.getAllPatients();
    this.getAllMedecins();
    this.getAllDM();
    this.getUserByUsername()
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.user = res;
        if(this.user.role !='ROLE_AIDE_SOIGNANT'){
          this.authService.logOut();
        }
      });
    }

  addNewDM(){

    this.userService.getUserById(this.m.id).subscribe(
      (res: User)=>{
        this.m = res;
        console.log(this.m);
        this.userService.getPatientById(this.p.id).subscribe(
          (res : Patient)=>{
            this.p = res;
            console.log(this.p);
            this.m.children.push(this.p);

            this.aideSservice.updateM(this.m.id, this.m).subscribe(
              res=>{
                console.log(this.m);
                this.dm.patientId = this.p.id;
                this.aideSservice.addNewDM(this.dm).subscribe(
                  res =>{
                    this.getAllDM();
                  })
              })
          })
      })
  }

  getAllPatients(){
    this.aideSservice.getAllPatients().subscribe(
      (res: Patient[]) =>{
      this.patients = res;
      }
    )
  }

  getAllMedecins(){
    this.aideSservice.getAllMedecins().subscribe(
      (res: User[]) =>{
      this.medecins = res;
      }
    )
  }

  getAllDM(){
    this.aideSservice.getAllDM().subscribe(
      (res : DossierMedical[])=>{
        this.dms = res;
      }
    )
  }
}
