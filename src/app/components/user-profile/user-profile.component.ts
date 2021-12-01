import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../class/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  user= new User();
  username='';

  constructor(private authService: AuthService,private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.getUserByUsername();

  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);

    this.authService.getUserByUsername(this.username).subscribe(
      (res:User) =>{
        this.user = res;
        if(this.user.role ==='ROLE_PATIENT'){
          this.authService.logOut();
        }
      });
  }

  updateUser(){
    this.userService.updateUser(this.user.id, this.user).subscribe(
      res=>{
        alert("Profile Edited succesfully");
      }
    )
  }
}
