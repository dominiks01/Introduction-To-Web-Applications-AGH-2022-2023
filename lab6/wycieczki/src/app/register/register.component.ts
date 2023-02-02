import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountDataService } from './../services/account-data.service';
import { Component } from '@angular/core';
import { debounceTime, ignoreElements} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private accountService : AccountDataService, private formBuilder: FormBuilder, private router : Router) {}

  registerForm!: FormGroup;
  status: boolean = true;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group ({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      secondName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(3)]],
      passwordRepeated: ['',  [Validators.required, Validators.minLength(3)]],
    })
  }

  formErrors = {
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    passwordRepeated: ''
  }

  private messages = {
    firstName: {
      required: 'Imię jest wymagana!',
      minlength: 'Minimum 3 znaki.',
    },
    secondName: {
      required: 'Nazwisko jest wymagane!',
      minlength: 'Minimum 3 znaki.',
    },
    email: {
      required: 'Email jest wymagany!',
      email: 'Niepoprawny Email!',
    },
    password: {
      required: 'Hasło jest wymagane!',
      minlength: 'Minimum 3 znaki.',
    },
    passwordRepeated: {
      required: 'Hasła muszą się zgadzać',
      minlength: 'Minimum 3 znaki.',
    }
  }

  onControlValueChanged() : void {
    const form = this.registerForm;

    for (let field in this.formErrors) {
      this.formErrors[field as keyof typeof this.formErrors]='';
      let control = form.get(field)
      if ((control && control.dirty && !control.valid) || control?.untouched) {
        for (const key in control.errors) {
          this.formErrors[field as keyof typeof this.formErrors] += this.messages[field as keyof object][key as keyof object]
      }
    }
  }
}

  register() {
    this.onControlValueChanged();
    this.registerForm.valueChanges.pipe(debounceTime(100)).subscribe((value) => {
      this.onControlValueChanged()
    })

    let email =             this.registerForm.get('email')!.value
    let password =          this.registerForm.get('password')!.value
    let firstName =         this.registerForm.get('firstName')!.value
    let secondName =        this.registerForm.get('secondName')!.value
    let passwordRepeated =  this.registerForm.get('passwordRepeated')!.value

    if(passwordRepeated != password){
      this.registerForm.controls['passwordRepeated'].setErrors({'incorrect': true});
      this.formErrors['passwordRepeated' as keyof typeof this.formErrors] += this.messages['passwordRepeated' as keyof object]['required' as keyof object]
      return;
    }

    this.status = this.registerForm.valid;

    if(this.status){
      let success = this.accountService.registerUser(firstName, secondName, email, password);
    }
  }


}
