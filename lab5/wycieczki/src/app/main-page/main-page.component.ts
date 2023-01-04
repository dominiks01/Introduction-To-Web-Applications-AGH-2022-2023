import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faShoppingBasket,
  faFilter,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../dataservice';

@Component({
  selector: 'home',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(public dataservice: DataService) {}

  faShoppingBasket = faShoppingBasket;
  faFilter = faFilter;

  ngOnDestroy() {}

  tripCounter: number = 0;
  showdiv3: boolean = false;

  ngOnInit(): void {
    this.tripCounter = this.dataservice.tripData.reduce(
      (accumulator, current) => {
        return accumulator + (current['startQuantity'] - current['quantity']);
      },
      0
    );
  }

  checkCheapest(priceOfTrip: any) {
    return (
      this.dataservice.tripData.reduce(function (prev, curr) {
        return prev['price'] < curr['price'] ? prev : curr;
      }).price == priceOfTrip
    );
  }

  checkMostExpenssive(priceOfTrip: any) {
    return (
      this.dataservice.tripData.reduce(function (prev, curr) {
        return prev['price'] > curr['price'] ? prev : curr;
      }).price == priceOfTrip
    );
  }

  tripDelete($event: any) {
    let indexOfObjectInDataService = this.dataservice.tripData.findIndex(
      (object: any) => {
        return object['name'] === $event['name'];
      }
    );

    if (indexOfObjectInDataService !== -1) {
      this.dataservice.tripData.splice(indexOfObjectInDataService, 1);
    }

    this.tripCounter -= parseInt($event['value']);
    this.dataservice.basketSum -= $event['value'] * $event['price'];
  }

  receiveMessage($event: any) {
    this.dataservice.basketSum -= parseInt($event);
    this.tripCounter -= $event > 0 ? 1 : -1;
  }

  getData() {
    return this.dataservice.tripData;
  }

  showFilter() {
    this.showdiv3 = !this.showdiv3;
  }

  getSum() {
    return this.dataservice.basketSum;
  }
}
