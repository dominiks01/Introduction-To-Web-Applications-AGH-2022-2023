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
    this.trips = [];
    for(let key in this.dataservice.basket){
      let id = key;
      console.log(this.dataservice.trips)
    }
    return this.trips;
  }

  getSum(){
    return this.dataservice.basketSum;
  }
}
