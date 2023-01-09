import { Component, OnInit } from '@angular/core';
import { Trip } from '../Trip';
import { DataService } from '../services/data.service';
import { BoughtTrip } from '../IBoughtTrip';
import { SetDateService } from '../services/set-date.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  constructor(private dataService: DataService, private setDate: SetDateService) {}

  acutalCurrency = this.dataService.currency
  history!: BoughtTrip[]
  basket!: Trip[]
  ngOnInit(): void {
    this.dataService.getReservedTrips().subscribe(change => {
      this.basket = []
      for(let trip of change) {
        this.basket.push({
          id: trip.id,
          name: trip.name,
          destination: trip.destination,
          startDate: trip.startDate,
          endDate: trip.endDate,
          unitPrice: trip.unitPrice,
          maxQuantity: trip.maxQuantity,
          avaible: trip.avaible,
          shortDesc: trip.shortDesc,
          longDesc: trip.longDesc,
          imageLink1: trip.imageLink1,
          imageLink2: trip.imageLink2,
          imageLink3: trip.imageLink3,
          counter: trip.counter,
          overallRate: trip.overallRate,
          raitings: trip.raitings,
          reserved: trip.reserved
        })
      }
    })
  }

  deleteTrip(trip: Trip) {
    this.dataService.updateQuantity(trip.id, trip.avaible, 0)
  }

  substractTrip(trip: Trip) {
    this.dataService.updateQuantity(trip.id, trip.maxQuantity + 1, trip.reserved - 1)
  }

  addTrip(trip: Trip) {
      this.dataService.updateQuantity(trip.id, trip.maxQuantity - 1, trip.reserved + 1)
  }

  buyTrip(trip: Trip) {
    console.log(trip)
    let setted = this.setDate.setStatus(trip)
    let bought = {
      id: this.dataService.getLastBoughtID(),
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      boughtDate: this.setDate.getDate().toDateString(),
      unitPrice: trip.unitPrice,
      maxQuantity: trip.maxQuantity,
      imageLink1: trip.imageLink1,
      bought: trip.reserved,
      status: setted
    }
    this.dataService.updateQuantity(trip.id, trip.maxQuantity, 0)
    this.dataService.updateAvaible(trip.id, trip.avaible - trip.reserved)
    this.dataService.addToBought(bought)
  }

}
