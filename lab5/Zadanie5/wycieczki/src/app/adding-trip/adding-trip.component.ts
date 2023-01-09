import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms'
import {Validators } from '@angular/forms'
import { debounceTime} from 'rxjs/operators';
import { Trip } from '../Trip';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-adding-trip',
  templateUrl: './adding-trip.component.html',
  styleUrls: ['./adding-trip.component.css']
})
export class AddingTripComponent implements OnInit {
  @Output() formSubmitTrip = new EventEmitter<Trip>()
  actualCurrency = this.dataService.currency

  tripForm !: FormGroup

  formErrors = {
    tripName: '',
    tripDestination: '',
    tripStartDate: '',
    tripEndDate: '',
    tripUnitPrice: '',
    tripMaxQuantity: '',
    tripShortDesc: '',
    tripImageLink1: '',
    tripImageLink2: '',
    tripImageLink3: ''
  }

  private validationMessages = {
    tripName: {
      required: 'Nazwa jest wymagana!',
      pattern: 'Poprawny format nazwy to np. "Gorąca Antarktyda".'
    },
    tripDestination: {
      required: 'Miejsce wycieczki jest wymagane!',
      minlength: 'Minimum 3 znaki.'
    },
    tripStartDate: {
      required: 'Data wyjazdu jest wymagana!',
      pattern: 'Poprawny format daty to XX/XX/XXXX'
    },
    tripEndDate: {
      required: 'Data powrortu jest wymagana!',
      pattern: 'Poprawny format daty to XX/XX/XXXX'
    },
    tripUnitPrice: {
      required: 'Cena jest wymagana!',
      pattern: 'Tylko liczby!',
    },
    tripMaxQuantity: {
      required: 'Ilość biletów jest wymagana!',
      pattern: 'Tylko liczby!'
    },
    tripShortDesc: {
      required: 'Opis jest wymagany!',
      minlength: 'Minimum 20 znaków.',
      maxlength: 'Maksimum 60 znaków.'
    },
    tripImageLink1: {
      required: 'Zdjęcie jest wymagane!',
      minlength: 'Zdjęcie musi być w postaci linku!'
    },
    tripImageLink2: {
      required: 'Zdjęcie jest wymagane!',
      minlength: 'Zdjęcie musi być w postaci linku!'
    },
    tripImageLink3: {
      required: 'Zdjęcie jest wymagane!',
      minlength: 'Zdjęcie musi być w postaci linku!'
    },
  }

  constructor(private formBuilder : FormBuilder, private dataService: DataService) { }


  addNewItem(newTrip: Trip) {
    // this.formSubmitTrip.emit(newTrip)
    this.dataService.createTrip(newTrip)
    
  }

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      tripName: ['', [Validators.required, Validators.pattern('[A-Z]{1}[a-złćźężąóu]+([ ][A-Z]{1}[a-złćźężąóu]+)?')]],
      tripDestination: ['', [Validators.required, Validators.minLength(3)]],
      tripStartDate: ['', [Validators.required, Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]],
      tripEndDate: ['', [Validators.required, Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]],
      tripUnitPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      tripMaxQuantity: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      tripShortDesc: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(60)]],
      tripImageLink1: ['', [Validators.required, Validators.minLength(12)]],
      tripImageLink2: ['', [Validators.required, Validators.minLength(12)]],
      tripImageLink3: ['', [Validators.required, Validators.minLength(12)]],
    })
    this.tripForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged()
     })
     this.onControlValueChanged()
  }

  onControlValueChanged() : void {
    const form = this.tripForm

    for (let field in this.formErrors) {
      this.formErrors[field as keyof typeof this.formErrors]= ''
      let control = form.get(field)
      
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field as keyof typeof this.validationMessages]
        console.log(validationMessages)
        for (const key in control.errors) {
          console.log(key)
          console.log(validationMessages[key as keyof typeof validationMessages])
          this.formErrors[field as keyof typeof this.formErrors] += validationMessages[key as keyof typeof validationMessages];
        }
      }
      console.log(this.formErrors)
    }
  }


  makeNewTrip() {
    console.log(this.tripForm)
      if (!this.tripForm.valid) {
        return
      }
    let newTrip = {
      id: this.dataService.getID(),
      name: this.tripForm.get('tripName')!.value,
      destination: this.tripForm.get('tripDestination')!.value,
      startDate: this.tripForm.get('tripStartDate')!.value,
      endDate: this.tripForm.get('tripEndDate')!.value,
      unitPrice: this.tripForm.get('tripUnitPrice')!.value,
      maxQuantity: this.tripForm.get('tripMaxQuantity')!.value,
      avaible: this.tripForm.get('tripMaxQuantity')!.value,
      reserved: 0,
      shortDesc: this.tripForm.get('tripShortDesc')!.value,
      imageLink1: this.tripForm.get('tripImageLink1')!.value,
      imageLink2: this.tripForm.get('tripImageLink2')!.value,
      imageLink3: this.tripForm.get('tripImageLink3')!.value,
      counter: 0,
      overallRate: 0,
      raitings: 0
    } as Trip
    this.addNewItem(newTrip)
    this.tripForm.reset()
  }
}
// export interface Trip {
//   name: string
//   destination: string
//   startData: string
//   endData: string
//   unitPrice: number
//   maxQuantity: number
//   shortDesc: string
//   imageLink: string
//   counter: number
//   overallRate: any
//   raitings: number
// }

  // tripForm = new FormGroup({
  //   tripName: new FormControl(['', [Validators.required, Validators.pattern('[A-Z]{1}[a-złćźężąóu]+([ ][A-Z]{1}[a-złćźężąóu]+)?')]]),
  //   tripDestination: new FormControl(['', Validators.required, Validators.minLength(3)]),
  //   tripStartDate: new FormControl(['', Validators.required, Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
  //   tripEndDate: new FormControl(['', Validators.required, Validators.pattern('[0-9]{2}[/][0-9]{2}[/][0-9]{4}')]),
  //   tripUnitPrice: new FormControl(['', Validators.required, Validators.minLength(3)]),
  //   tripMaxQuantity: new FormControl(['', Validators.required, Validators.minLength(1)]),
  //   tripShortDesc: new FormControl(['', Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
  //   tripImageLink: new FormControl(['', Validators.required, Validators.pattern('[A-Za-z]+([_-]+[A-Za-z]+)')]),
  // })
    