import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { DossierMedicalComponent } from './components/dossier-medical/dossier-medical.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { InformationComponent } from './components/information/information.component';
import { AidsoignantDashboardComponent } from './components/aidsoignant-dashboard/aidsoignant-dashboard.component';
import { AntecedentsComponent } from './components/antecedents/antecedents.component';
import { ASpatientsComponent } from './components/aspatients/aspatients.component';
import { BilanDetailsComponent } from './components/bilan-details/bilan-details.component';
import { BilanDmdComponent } from './components/bilan-dmd/bilan-dmd.component';
import { BpComponent } from './components/bp/bp.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { EcComponent } from './components/ec/ec.component';
import { InterrogatoirComponent } from './components/interrogatoir/interrogatoir.component';
import { IotmedComponent } from './components/iotmed/iotmed.component';
import { MedecinDMSComponent } from './components/medecin-dms/medecin-dms.component';
import { MedecinPatientComponent } from './components/medecin-patient/medecin-patient.component';
import { NavdmComponent } from './components/navdm/navdm.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PapierComponent } from './components/papier/papier.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: 'users', component: UserComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'users/:id', component: UserEditComponent},
  { path: '', component: AuthComponent},
  { path: 'logout', component: LogoutComponent},

  { path: 'patient/dashboard', component: PatientDashboardComponent},
  { path: 'patient/:idp/dossierMedical', component: DossierMedicalComponent},
  { path: 'patient/:idp/dossierMedical/bpDetails', component: BilanDetailsComponent},
  { path: 'patient/profile', component: ProfileComponent},

  { path: 'medecin/patients', component: MedecinDMSComponent},
  { path: 'medecin/statistique', component: StatisticsComponent},
  { path: 'medecin/:idp/iot', component: IotmedComponent},

  { path: 'aideSoignant/dashboard', component: AidsoignantDashboardComponent},
  { path: 'aideSoignant/mp', component: MedecinPatientComponent},
  { path: 'aideSoignant/patients', component: ASpatientsComponent},

  { path: 'dm/consultation/:idc/nav', component: NavdmComponent},
  { path: 'dm/consultation/:idc/:step/info', component: InformationComponent},
  { path: 'dm/consultation/:idc/:step/antecedents', component: AntecedentsComponent},
  { path: 'dm/consultation/:idc/:step/bilanDemande', component: BilanDmdComponent},

  { path: 'dm/consultation/:idc/:step/intero', component: InterrogatoirComponent},
  { path: 'dm/consultation/:idc/:step/', component: ConsultationComponent},
  { path: 'dm/consultation/:idc/:step/ec', component: EcComponent},

  { path: 'dm/consultation/:idc/:step/bp', component: BpComponent},
  { path: 'dm/consultation/:idc/:step/pp', component: PapierComponent},
  { path: 'user/profile', component: UserProfileComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
