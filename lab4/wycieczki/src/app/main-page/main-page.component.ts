import { TripCardComponent } from './../trip-card/trip-card.component';
import { Component, OnInit } from '@angular/core';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  faShoppingBasket = faShoppingBasket;
  constructor(){}

  trips: any;
  prices: any;
  json2!: JSON;
  totalSum : number = 0;
  tripCounter : number = 0;

  ngOnInit(): void {
    fetch('./assets/tripInfo.json')
      .then((res) => res.json())
      .then((json) => {
        this.trips = json["trips"];
        this.json2 = this.trips;
        this.prices = Object.values(this.json2).map(item => item.price).map((item:any) => parseInt(item));
      });
  }

  checkCheapest(priceOfTrip: any){
    return priceOfTrip == Math.min(...this.prices);
  }

  checkMostExpenssive(priceOfTrip: any){
    return priceOfTrip == Math.max(...this.prices);
  }

  tripDelete($event:any){

    const indexOfObject = this.trips.findIndex((object:any) => {
      return object['name'] === $event['object']['name'];
    });

    if (indexOfObject !== -1) {
      this.trips.splice(indexOfObject, 1);
    }

    this.json2 = this.trips;
    this.prices = Object.values(this.json2).map(item => item.price).map((item:any) => parseInt(item));

    this.tripCounter -= ($event['object']['quantity'] - $event['quantity']);
    this.totalSum -= ($event['object']['quantity'] - $event['quantity'])*parseInt($event['object']['price']);
  }

  receiveMessage($event:any){
    this.totalSum -= parseInt($event);
    this.tripCounter -= (parseInt($event)>0)?1:-1;
  }
}
