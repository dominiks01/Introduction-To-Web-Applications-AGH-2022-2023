import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
// import { Trip } from '../Trip';
// import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})


export class TripsComponent implements OnInit{
  constructor(public dataService: DataService) {
    // console.log(this.trips)
    // console.log(this.dataService.printData())
    // this.dataService.createTrip()
  }
  actualCurrency = this.dataService.currency

  qua!: number
  suma!: number
  tripToPass!: Trip
  // trips: Trip[] = []
  trips!: Trip[]
  ngOnInit(): void {
    this.dataService.getTrips().subscribe(change => {
      this.trips = []
      this.suma = 0
      this.qua = 0
      for(let trip of change) {
        if (trip.reserved > 0) {
          this.suma += +trip.reserved * trip.unitPrice
          this.qua += +trip.reserved
        }
        this.trips.push({
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
    // fetch('./assets/tripsData.json').then(res => res.json())
    // .then(json => {
    //   for (let i in json["trips"]) {
    //     this.trips.push({
    //       id: json["trips"][i]["id"],
    //       name: json["trips"][i]["name"],
    //       destination: json["trips"][i]["destination"],
    //       startDate: json["trips"][i]["startDate"],
    //       endDate: json["trips"][i]["endDate"],
    //       unitPrice: json["trips"][i]["unitPrice"],
    //       maxQuantity: json["trips"][i]["maxQuantity"],
    //       avaible: json["trips"][i]["avaible"],
    //       shortDesc: json["trips"][i]["shortDesc"],
    //       longDesc: json["trips"][i]["longDesc"],
    //       imageLink1: json["trips"][i]["imageLink1"],
    //       imageLink2: json["trips"][i]["imageLink2"],
    //       imageLink3: json["trips"][i]["imageLink3"],
    //       counter: 0,
    //       overallRate: json["trips"][i]["overallRate"],
    //       raitings: json["trips"][i]["raitings"],
    //       reserved: 0,
    //     } as Trip)
    //   }
    //   console.log(this.trips)
    //   for (let i= 0; i < this.trips.length; i++) {
    //     console.log(this.trips[i])
    //     this.dataService.createTrip(this.trips[i])
    //   }
    // });

  }

  addingTickets(trip: Trip) {
    console.log(this.trips)
    if (trip.maxQuantity > 0) {
      trip.counter += 1
      trip.maxQuantity -= 1
      trip.reserved += 1
    }
    this.dataService.updateQuantity(trip.id, trip.maxQuantity, trip.reserved)
  }

  removingTickets(trip: Trip) {
    if (trip.maxQuantity < trip.avaible) {
      trip.counter -= 1
      trip.maxQuantity += 1
      trip.reserved -= 1
    }
    console.log(trip.reserved + ' ' + 'reserved')
    this.dataService.updateQuantity(trip.id, trip.maxQuantity, trip.reserved)
  }

  changeTripCnt(trip: Trip[]) {
    let cnt = 0
    for (let t of trip) {
      cnt += t.counter
    } 
    return cnt
  }

  expensiveTrip(trip: Trip) {
    let highest = -1
    let highestTmp = -1
    for (let t of this.trips) {
      let num = +t.unitPrice
      if (highest < num){
        highest = num
      }
    }
    highestTmp = highest
    highest = -1
    return +trip.unitPrice == highestTmp
  }

  cheapestTrip(trip: Trip){
    let smallest = 10000000000
    let smallestTmp = 0
    for (let t of this.trips) {
      let num = +t.unitPrice
      if (smallest > num) {
        smallest = num
      }
    }
    smallestTmp = smallest
    smallest = 10000000000
    return +trip.unitPrice == smallestTmp
  }

  deleteTrip(trip: Trip) {
    // this.valueInCart -= trip.unitPrice * trip.reserved
    // this.tripsInCart -= trip.reserved
    this.dataService.updateQuantity(trip.id, 0, 0)
    this.trips = this.trips.filter((elem) => {
      return elem != trip
    })
    this.dataService.deleteTrip(trip)
  }

  addingSubmitedTrip(newTrip: Trip) {
    console.log(newTrip)
    this.trips.push(newTrip)
  }

  raitingTrip(trip: Trip, rate: number) {
    trip.raitings += 1
    trip.overallRate = +trip.overallRate
    trip.overallRate += rate
  }

  checkIfWorks() {
    console.log(this.dataService.daneRef)
  }

  calculate(flag: number) {
    let suma = 0
    let q = 0
    this.dataService.getTrips().subscribe(change => {
      for(let trip of change) {
        console.log(trip)
        suma += +trip.unitPrice
        q += +trip.reserved
      }
    })
    if (flag === 1) {
      return suma
    } else {
      return q
    }
  }
}
  

export interface Trip {
  id: number
  name: string
  destination: string
  startDate: string
  endDate: string
  unitPrice: number
  maxQuantity: number
  avaible: number
  shortDesc: string
  longDesc: string
  imageLink1: string
  imageLink2: string
  imageLink3: string
  counter: number
  overallRate: any
  raitings: number
  reserved: number
}