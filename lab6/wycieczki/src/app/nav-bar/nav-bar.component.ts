import { Component } from '@angular/core';
import { AccountDataService } from '../services/account-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public AccountDataService: AccountDataService, private router : Router) {
    AccountDataService.isLogged()
  }
  title = 'wycieczki';
  users: any = []
  userUID : any = []
  userData : any = []

  ngOnInit(): void {
    this.AccountDataService.isLogged()
    this.AccountDataService.getAccounts().subscribe(elem => {
      this.users = elem;
    })

    this.AccountDataService.userData.subscribe(
      user => {
        if(user) this.userUID = user.uid;
      }
    )
  }

  signOut(){
    this.AccountDataService.SignOut();
  }

  getName(){
    if(this.users && this.userUID){
      this.users.forEach((element:any) => {
        if(element['uid' as keyof object] == this.userUID)
          this.userData = element;
      });
    }

    return this.userData['firstName' as keyof object]
  }

  isAdmin(){
    return this.AccountDataService.getRole() == "admin";
  }

  isManager(){
    return this.AccountDataService.getRole() == "manager";
  }
}
