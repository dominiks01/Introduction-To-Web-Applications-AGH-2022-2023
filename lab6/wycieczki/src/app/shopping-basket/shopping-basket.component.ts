import { __values } from 'tslib';
import { elementAt, observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice';

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
    return this.dataservice.basket;
  }

  getSum(){
    return this.dataservice.getSum();
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
    this.dataservice.updateQuantity(object['ID' as keyof object], object['available' as keyof object]-1, 0)
    this.dataservice.basket = this.dataservice.basket.filter(obj => {return obj !== object});
    this.dataservice.buy(object);
  }

}
