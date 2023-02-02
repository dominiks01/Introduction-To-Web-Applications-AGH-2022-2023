import { AccountDataService } from './../services/account-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent {
  constructor(public AccountDataService: AccountDataService){}

  setLocal(){
    this.AccountDataService.setPresistence("local")
  }

  setSession(){
    this.AccountDataService.setPresistence("session")
  }

  setNone(){
    this.AccountDataService.setPresistence("none")
  }
}
