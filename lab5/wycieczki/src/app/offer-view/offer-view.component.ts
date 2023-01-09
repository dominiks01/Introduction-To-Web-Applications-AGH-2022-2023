import { TripData } from './../tripData';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  faShoppingBasket,
  faFilter,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../dataservice';
import { elementAt, subscribeOn, take } from 'rxjs';


@Component({
  selector: 'home',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.css'],
})
export class offerView implements OnInit, OnDestroy {
  filtersLoaded: Promise<boolean> = Promise.resolve(false);

  constructor(public data: DataService) {
  }

  trips: Object[] = [];

  faShoppingBasket = faShoppingBasket;
  faFilter = faFilter;

  ngOnDestroy() {}

  tripCounter: number = 0;
  showdiv3: boolean = false;
  minPrice: number = Infinity;
  maxPrice: number = 0;

  ngOnInit(): void {
    this.data.getTrips().subscribe(value => {
      this.trips = value;
      this.filtersLoaded = Promise.resolve(true);
    });

    //this.trips.forEach(element => console.log(element));

    //this.data.getTrips().forEach(element => this.Trips.push(element));

    // this.tripCounter = this.dataservice.tripData.reduce(
    //   (accumulator, current) => {
    //     return accumulator + (current['startQuantity'] - current['quantity']);
    //   },
    //   0
    // );
  }

  checkCheapest(data: any) {
    return this.trips.reduce(function (prev, curr) {
          return prev['price' as keyof object] < curr['price' as keyof object] ? prev : curr;
        })['price' as keyof object] == data['price'];

  }

  checkMostExpenssive(data: any) {
    return this.trips.reduce(function (prev, curr) {
      return prev['price' as keyof object] > curr['price' as keyof object] ? prev : curr;
    })['price' as keyof object] == data['price'];

  }

  tripDelete($event: any) {
    // let indexOfObjectInDataService = this.dataservice.tripData.findIndex(
    //   (object: any) => {
    //     return object['name'] === $event['name'];
    //   }
    // );

    // if (indexOfObjectInDataService !== -1) {
    //   this.dataservice.tripData.splice(indexOfObjectInDataService, 1);
    // }

    // this.tripCounter -= parseInt($event['value']);
    // this.data.basketSum -= $event['value'] * $event['price'];
  }

  receiveMessage($event: any) {
    // this.data.basketSum -= parseInt($event);
    // this.tripCounter -= $event > 0 ? 1 : -1;
  }

  getData() {
    return this.trips;
  }

  countTrips(){
    let count = 0;
    for(let key in this.data.basket){
      count += this.data.basket[key];
    }
    return count;
  }

  showFilter() {
    this.showdiv3 = !this.showdiv3;
  }

  getSum() {
    return this.data.basketSum;
  }
}