import { DataService } from '../services/dataservice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  trips: Object[] = [];

  constructor( public dataservice: DataService){}

  ngOnInit(){
    this.dataservice.getHistory().subscribe(value => {
      this.trips = value;
    })
  }

  getData(){
    return this.trips;
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

  getDateOfPurchase(object: object){
    return object['now' as keyof object];
  }

  getCost(object:object){
    return this.getReserved(object) * object['price' as keyof object];
  }

  getStatus(object:object){
    return object['status' as keyof object];
  }

}
