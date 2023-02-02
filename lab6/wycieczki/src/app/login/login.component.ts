import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountDataService } from './../services/account-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private accountService : AccountDataService, private formBuilder: FormBuilder, private router : Router) {}

  loginForm!: FormGroup
  status: boolean = true;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group ({
      email: [''],
      password: ['']
    })
  }

  logIn() {
    let email = this.loginForm.get('email')!.value
    let password = this.loginForm.get('password')!.value
    let succes = this.accountService.LogIn(email, password);

    const delay = (ms:any) => new Promise(res => setTimeout(res, ms));

    () => async () => {
      await delay(300)
      this.status = succes;
  }
}


}
