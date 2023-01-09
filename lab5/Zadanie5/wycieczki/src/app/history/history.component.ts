import { Component, OnInit } from '@angular/core';
import { Trip } from '../Trip';
import { DataService } from '../services/data.service';
import { BoughtTrip } from '../IBoughtTrip';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  constructor(private dataService: DataService) {
    
  }
  actualCurrency = this.dataService.currency

  IsDuring!: boolean
  IsCompleted!: boolean
  IsUpcoming!: boolean

  boughtTrips!: BoughtTrip[]
  suma!: number
  qua!: number
  ngOnInit(): void {
      this.IsDuring = false
      this.IsCompleted = false
      this.IsUpcoming = false
      this.dataService.getBought().subscribe(change => {
      this.boughtTrips = []
      this.suma = 0
      this.qua = 0
      for(let trip of change) {
        console.log(trip)
        if (trip.reserved > 0) {
          this.suma += +trip.reserved * trip.unitPrice
          this.qua += +trip.reserved
        }
        this.boughtTrips.push({
          id: trip.id,
          name: trip.name,
          destination: trip.destination,
          startDate: trip.startDate,
          endDate: trip.endDate,
          boughtDate: trip.boughtDate,
          unitPrice: trip.unitPrice,
          maxQuantity: trip.maxQuantity,
          imageLink1: trip.imageLink1,
          bought: trip.bought,
          status: trip.status
        })
      }
    })
  }

  displayMsg(bought: BoughtTrip) {
    let msg
    if (bought.status == -1) {
      msg = "W TRAKCIE"
    } else if (bought.status == 0) {
      msg = "NADCHODZĄCA"
    } else {
      msg = "ZAOŃCZONA"
    }
    return msg
  }

  printChecks() {
    console.log(this.IsUpcoming)
    console.log(this.IsDuring)
    console.log(this.IsCompleted)
  }

}
