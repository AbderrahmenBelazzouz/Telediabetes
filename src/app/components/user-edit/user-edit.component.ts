import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/class/patient';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../class/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id:any;
  data: any;
  user = new User();
  patient = new Patient();
  currentUser = new User();
  username:string;
  ROLE_PATIENT='ROLE_PATIENT'
  ROLE_MEDECIN='ROLE_MEDECIN'
  ROLE_ADMIN='ROLE_ADMIN'
  ROLE_AIDE_SOIGNANT='ROLE_AIDE_SOIGNANT'
  ACTIVE='ACTIVE'
  INACTIVE='INACTIVE'
  HOMME='HOMME'
  FEMME='FEMME'
  TYPE_1='TYPE_1'
  TYPE_2='TYPE_2'

  constructor(private authService: AuthService, private activatedRoute:ActivatedRoute, private router:Router, private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getUserByUsername();
    this.getData();
    this.getPData();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    this.authService.getUserByUsername(this.username).subscribe(
      (res : User) =>{
        this.currentUser = res;
        if(this.currentUser.role ==='ROLE_PATIENT'){
          this.authService.logOut();
        }
      });
    }



  getData(){
    this.userService.getUserById(this.id).subscribe(
      res=>{
        this.data = res;
        this.user = this.data;
      }
    )
  }
  getPData(){
    this.userService.getPatientById(this.id).subscribe(
      res=>{
        this.data = res;
        this.patient = this.data;
      }
    )
  }

  updateUser(){
    console.log(this.user.role)
    this.userService.updateUser(this.id, this.user).subscribe(
      res=>{
        this.router.navigate(['users']);
      }
    )
  }

  updatePatient(){
    console.log(this.patient);
    this.userService.updatePatient(this.id, this.patient).subscribe(
      res=>{
        if(this.isDoctor()){
          this.router.navigate(['medecin/patients']);

        }else if(this.isAideSoignant()){
          this.router.navigate(['aideSoignant/patients']);
        }
      }
    )
  }

  isAdmin(){
    return this.currentUser.role == 'ROLE_ADMIN';
  }
  isAideSoignant(){
    return this.currentUser.role == 'ROLE_AIDE_SOIGNANT';
  }
  isDoctor(){
    return this.currentUser.role == 'ROLE_MEDECIN';
  }

}
