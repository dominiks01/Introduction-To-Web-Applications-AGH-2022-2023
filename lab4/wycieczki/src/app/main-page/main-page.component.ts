import { RatingData } from '../ratingData';
import { RatingComponent } from './../rating/rating.component';
import { TripData } from '../tripData';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { faShoppingBasket, faFilter, faL } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../dataservice';

@Component({
  selector: 'home',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy{

  constructor(public dataservice: DataService) {}

  faShoppingBasket = faShoppingBasket;
  faFilter = faFilter;

  ngOnDestroy() {
  }

  trips: TripData[] = [];
  prices: any = [];
  totalSum : number = 0;
  tripCounter : number = 0;

  showdiv3: boolean = false;

  ngOnInit(): void {
    console.log(this.dataservice.tripData);
    this.trips = this.dataservice.tripData;

    this.trips.forEach((elem)=>{
      this.tripCounter += (elem.startQuantity - elem.quantity);
    })
  }

  checkCheapest(priceOfTrip: any){
    let minPrice: number = Infinity;
    this.dataservice.tripData.forEach(element => {
      minPrice = Math.min(minPrice, element.price);
    });
    return priceOfTrip == minPrice;
  }

  checkMostExpenssive(priceOfTrip: any){
    let maxPrice: number = 0;
    this.dataservice.tripData.forEach(element => {
      maxPrice = Math.max(maxPrice, element.price);
    });
    return priceOfTrip == maxPrice;
  }

  tripDelete($event:any){
    let indexOfObjectInDataService = this.dataservice.tripData.findIndex((object:any) => {
       return object['name'] === $event['name']
     });

    if (indexOfObjectInDataService !== -1) {
      this.dataservice.tripData.splice(indexOfObjectInDataService, 1);
    }

    this.tripCounter -= parseInt($event['value']);
    this.dataservice.basketSum -= parseInt($event['value'])*parseInt($event['price']);
    this.prices = Object.values(this.trips).map(item => item.price).map((item:any) => parseInt(item));
  }

  receiveMessage($event:any){
    this.dataservice.basketSum -= parseInt($event);
    this.tripCounter -= (parseInt($event)>0)?1:-1;
  }

  getData(){
    return Object(this.trips);
    this.trips;
  }

  showFilter(){
    this.showdiv3 = !this.showdiv3;
  }

  getSum(){
    return this.dataservice.basketSum;
  }
}
