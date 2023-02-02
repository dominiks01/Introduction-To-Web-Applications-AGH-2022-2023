import {Component,OnInit,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,} from '@angular/forms';
import { TripData } from '../tripData';
import { DataService } from '../services/dataservice';

@Component({
  selector: 'new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css'],
})
export class NewTrip implements OnInit, OnDestroy {
  modelForm!: FormGroup;

  constructor(public dataservice: DataService, public router: Router) { }

  ngOnInit(): void {
    this.modelForm = new FormGroup({
      name: new FormControl(),
      country: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl(),
      description: new FormControl(),
    });
  }

  validate(form:any) : boolean{
    return  form.value.name != null  &&
            form.value.country != null  &&
            form.value.startDate != null  &&
            form.value.endDate != null  &&
            form.value.price >= 0  &&
            form.value.quantity >= 0 &&
            form.value.description != null
  }

  onSubmit(form: any): void {
    if(this.validate(this.modelForm)){
      // this.dataservice.tripData.push(
      //   new TripData(form.value['name'],form.value['country'],form.value['startDate'],form.value['endDate'],
      //   parseInt(form.value['price']), parseInt(form.value['quantity']), "", form.value['description']
      //   ));

      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
  }
}
