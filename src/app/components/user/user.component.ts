import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../class/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = new Array<User>();
  user = new User();
  u:any;
  username='';
  currentUser = new User();
  index:number;

  constructor( private userService: UserService, private router:Router,
    private authService: AuthService) { };

  ngOnInit(): void {
    this.getUserByUsername();
  }

  getUserByUsername(){
    this.username = sessionStorage.getItem('username')
    console.log(this.username);

    this.authService.getUserByUsername(this.username).subscribe(
      (res:User) =>{
        this.currentUser = res;
        if(this.currentUser.role !='ROLE_ADMIN'){
          this.authService.logOut();
        }
        this.getUsers();
      });
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      (res:User[]) =>{
        this.users = [];
        res.forEach(element => {
          if(element.role!='ROLE_ADMIN'){
              this.users.push(element);
          }
        });
      });
  }

  registerUser(){
    this.userService.addUser(this.user).subscribe(
      res =>{
        this.u = res;
        //console.log();
        this.router.navigate(['users']);
      });
  }

  deleteUser(id){
    this.userService.deleteUser(id).subscribe(
      res =>{
          console.log(res);
          this.getUsers();
      }
    )
  }

}
