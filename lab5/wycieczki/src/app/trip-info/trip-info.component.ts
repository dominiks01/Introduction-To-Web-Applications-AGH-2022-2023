import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../dataservice';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit, OnDestroy{

  data!: any;
  id!: number;

  constructor(public dataservice: DataService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params['params' as keyof object]['ID'];
    })
  }

  ngOnInit(): void {
    this.getTrip();
  }

  ngOnDestroy(): void {}

  changeQuantity(value : any){
    let starting =  this.data.available;

    if(this.data.available <= 0)
      return;

    let newQuantity = parseInt(this.data.available) + value;
    let newReserved = parseInt(this.data.reserved) - value;

    if(newQuantity > this.data.quantity || newQuantity < 0 || newReserved < 0 || newReserved > this.data.quantity)
      return

    this.dataservice.updateQuantity(parseInt(this.data.ID), newQuantity, newReserved);
    this.dataservice.basketSum += (starting - newQuantity)*this.data.price;
    this.dataservice.addToBasket(this.data.ID, value);
  }

  getTrip(){
    this.dataservice.getTrips().subscribe(
      value => {
        for(let i of value){
          if(i['ID' as keyof object] == this.id){
            this.data = i;
          }
        }
      }
    )
  }

  goToRating(){
    this.router.navigate(['/offer-view/rate-trip', this.data])
  }

}
