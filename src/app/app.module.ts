import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { JWTAuthHtttpInterceptorService } from './services/jwt-auth-htttp-interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { IotComponent } from './components/iot/iot.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DossierMedicalComponent } from './components/dossier-medical/dossier-medical.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AidsoignantDashboardComponent } from './components/aidsoignant-dashboard/aidsoignant-dashboard.component';
import { AntecedentsComponent } from './components/antecedents/antecedents.component';
import { ASpatientsComponent } from './components/aspatients/aspatients.component';
import { BilanDetailsComponent } from './components/bilan-details/bilan-details.component';
import { BilanDmdComponent } from './components/bilan-dmd/bilan-dmd.component';
import { BilanPaperComponent } from './components/bilan-paper/bilan-paper.component';
import { BpComponent } from './components/bp/bp.component';
import { BpnavComponent } from './components/bpnav/bpnav.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { EcNavComponent } from './components/ec-nav/ec-nav.component';
import { EcComponent } from './components/ec/ec.component';
import { InformationComponent } from './components/information/information.component';
import { InterrogatoirComponent } from './components/interrogatoir/interrogatoir.component';
import { IotmedComponent } from './components/iotmed/iotmed.component';
import { MedecinDMSComponent } from './components/medecin-dms/medecin-dms.component';
import { MedecinPatientComponent } from './components/medecin-patient/medecin-patient.component';
import { NavdmComponent } from './components/navdm/navdm.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PapierComponent } from './components/papier/papier.component';
import { PpnavComponent } from './components/ppnav/ppnav.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    AuthComponent,
    HeaderComponent,
    LogoutComponent,
    UserEditComponent,
    PatientDashboardComponent,
    IotComponent,
    MedecinPatientComponent,
    ProfileComponent,
    DossierMedicalComponent,
    SidebarComponent,
    UserProfileComponent,
    NavdmComponent,
    InformationComponent,
    AntecedentsComponent,
    ConsultationComponent,
    EcNavComponent,
    InterrogatoirComponent,
    EcComponent,
    BpComponent,
    BilanDmdComponent,
    BpnavComponent,
    AidsoignantDashboardComponent,
    MedecinPatientComponent,
    MedecinDMSComponent,
    ASpatientsComponent,
    BilanDetailsComponent,
    BilanPaperComponent,
    PpnavComponent,
    PapierComponent,
    PageNotFoundComponent,
    StatisticsComponent,
    IotmedComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:JWTAuthHtttpInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
