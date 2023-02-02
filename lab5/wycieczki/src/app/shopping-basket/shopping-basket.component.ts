import { elementAt, observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit{
  constructor(public dataservice: DataService) {}

  trips: object[] = [];

  ngOnInit(){
  }

  getData(){
    this.dataservice.getTrips().subscribe(value => {
      this.trips = value;
    });
    return this.trips.filter(element => {return element['reserved' as keyof object] >= 1});
  }

  getSum(){
    return this.dataservice.basketSum;
  }

  getImage(object: object){
    return object['ImagePath' as keyof object];
  }

  getName(object: object){
    return object['name' as keyof object];
  }

  getCountry(object: object){
    return object['country' as keyof object];
  }

  getStartDate(object: object){
    return object['startDate' as keyof object];
  }

  getEndDate(object: object){
    return object['endDate' as keyof object];
  }

  getReserved(object: object){
    return object['reserved' as keyof object];
  }

  getCost(object:object){
    return this.getReserved(object) * object['price' as keyof object];
  }

  buyTrips(object:object){
    this.dataservice.bought(object);
  }

}
