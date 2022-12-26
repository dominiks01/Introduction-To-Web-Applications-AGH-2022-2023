import { TripData } from '../tripData';
import { Router, NavigationStart } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../dataservice';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input() data!: TripData;
  @Input() cheapest!: boolean;
  @Input() mostExpensive!: boolean;
  @Input() tripToDelete: any;

  @Output() sumEmiter = new EventEmitter<string>();
  @Output() tripEmiter = new EventEmitter<Object>();

  faTrash = faTrash;
  constructor(public dataservice: DataService) {}

  startingQuantity! : number;
  bookingWarning = false;

  bookedTrips!: number;
  average: number = 0;

  dataToDelete!: string;

  ngOnInit(): void {

    this.startingQuantity = this.data.startQuantity;

    this.data.ratings.forEach(element => {
      this.average += element['rating'];
    });

    if(this.data.ratings.length != 0)
      this.average /= this.data.ratings.length;
  }

  changeQuantity(value : any){
    let starting =  this.data.quantity

    this.data.quantity = ( this.data.quantity + value > this.startingQuantity ||  this.data.quantity+value < "0")?
                          this.data.quantity:  this.data.quantity + value;

    this.dataservice.tripData.forEach((element) => {
      if(element.name == this.data.name){
        element.quantity = this.data.quantity;
      }
    })

    if(starting !=  this.data.quantity){
      this.sumEmiter.emit((value*( this.data.price as any)).toString());
    }

  }

  removeTrip(){
    this.tripEmiter.emit({name: this.data.name, value: (this.data.startQuantity - this.data.quantity), price: this.data.price});
  }

  getAverage(){
    var value = 0;

    this.dataservice.tripData.forEach((element) => {
      if(element.name == this.data.name){
        value = element.averageRatings;
      }});

    return (value).toFixed(2);
  }

  getQuantity(){
    return this.data.quantity;
  }
}
