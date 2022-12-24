import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input() tripInfo!: any;
  @Input() cheapest!: boolean;
  @Input() mostExpensive!: boolean;

  @Output() sumEmiter = new EventEmitter<string>();
  @Output() tripEmiter = new EventEmitter<Object>();

  faTrash = faTrash;
  constructor() { }

  name!:string;
  country!:string;
  startDate!:string;
  endDate!:string;
  price!:string;
  quantity!:string;
  ImagePath!:string;
  description!: string;

  startingQuantity! : string;
  bookingWarning = false;

  bookedTrips!: number;

  ngOnInit(): void {
    this.name = this.tripInfo['name'];
    this.country = this.tripInfo['country'];
    this.startDate = this.tripInfo['startDate'];
    this.endDate = this.tripInfo['endDate'];
    this.price = this.tripInfo['price'];
    this.quantity = this.tripInfo['quantity'];
    this.ImagePath = this.tripInfo['ImagePath'];
    this.description = this.tripInfo['description'];
    this.startingQuantity = this.quantity;
  }

  changeQuantity(value : any){
    let starting = this.quantity;
    this.quantity = (this.quantity + value > this.startingQuantity || this.quantity+value < "0")? this.quantity: this.quantity + value;
    this.bookedTrips = parseInt(this.quantity);
    this.bookingWarning = (this.quantity <= "3")? true: false;

    if(starting != this.quantity){
      this.sumEmiter.emit((value*(this.price as any)).toString());
    }
  }

  removeTrip(value: any, quantity: any){
    this.tripEmiter.emit({object: value, quantity: quantity});
  }
}
