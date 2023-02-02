import { Router, ActivatedRoute } from '@angular/router';
import { Query } from '@angular/fire/compat/firestore';
import { validateArgCount } from '@firebase/util';
import { subscribeOn } from 'rxjs';
import { RatingData } from './../ratingData';
import { TripData } from '../tripData';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { faL, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../services/dataservice';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input() data!: Object;
  @Input() cheapest!: boolean;
  @Input() mostExpensive!: boolean;

  faTrash = faTrash;
  constructor(public dataservice: DataService, private router: Router, private route: ActivatedRoute) {
    this.isLoading = false;
  }

  startingQuantity! : number;
  average: number = 0;
  tripInfo!: any;
  trip!: any;

  isLoading: boolean = false;

  ngOnInit(): void {
    //this.getTrip();
    this.trip = this.data;
    this.isLoading = true;

    // this.trip = {
    //   id:           this.tripInfo['ID' as keyof object],
    //   name:         this.tripInfo['name' as keyof object],
    //   country:      this.tripInfo['country' as keyof object],
    //   price:        this.tripInfo['price' as keyof object],
    //   quantity:     this.tripInfo['quantity' as keyof object],
    //   startDate:    this.tripInfo['startDate' as keyof object],
    //   endDate:      this.tripInfo['endDate' as keyof object],
    //   ImagePath:    this.tripInfo['ImagePath' as keyof object],
    //   description:  this.tripInfo['description' as keyof object],
    //   reserved:     this.tripInfo['reserved' as keyof object],
    //   available:    this.tripInfo['available' as keyof object]
    // }

    // this.startingQuantity = this.data.startQuantity;

    // var rate = this.data.ratings as TripData[];

    // rate.forEach(element => {
    //   this.average += (element as TripData).averageRatings;
    // });
  }

  // getTrip(){
  //   let id = this.data['ID' as keyof object];
  //   this.dataservice.getTrips().subscribe(
  //     value => {
  //       for(let i of value){
  //         if(i['ID' as keyof object] == id){
  //           this.trip = i;
  //         }
  //       }
  //     }
  //   )
  // }


  changeQuantity(value : any){
    if(this.trip.available < 0)
      return;

    let newQuantity = this.trip.available + value;
    let newReserved = this.trip.reserved - value;

    if(newQuantity > this.trip.quantity || newQuantity < 0 || newReserved < 0 || newReserved > this.trip.quantity)
      return

    this.dataservice.updateQuantity(this.trip.ID, newQuantity, newReserved);
    this.trip['reserved' as keyof object] -= value;
    this.dataservice.addToBasket(this.trip);
  }

  removeTrip(){
    this.dataservice.removeTrip(this.trip.ID);
  }

  isOutOfOrder(){
    return this.data['available' as keyof object] <= 3;
  }

  getAverage(){
    //return this.data.averageRatings.toFixed(2);
  }

  getQuantity(){
    return this.trip.available;
  }

  goToInfo(){
    this.router.navigate(['/offer-view/trip-info', this.trip])
  }
}
