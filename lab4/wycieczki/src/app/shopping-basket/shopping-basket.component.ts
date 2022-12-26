import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit{
  constructor(public dataservice: DataService) {}

  ngOnInit(){
    console.log(this.dataservice.tripData);
  }

  getData(){
    return this.dataservice.tripData;
  }

  getSum(){
    return this.dataservice.basketSum;
  }
}
