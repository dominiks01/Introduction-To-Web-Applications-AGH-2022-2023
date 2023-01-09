import { Injectable } from '@angular/core';
import { BoughtTrip } from '../IBoughtTrip';
import { Trip } from '../Trip';

@Injectable({
  providedIn: 'root'
})
export class SetDateService {
  currDate = new Date()

  constructor() { }

  getDate() {
    return new Date(this.currDate)
  }

  setStatus(bought: Trip | BoughtTrip) { // -1 w trkacie, 0 nadchodząca, 1 zakończona
    let status = 1
    const [day1, month1, year1] = bought.startDate.split('/')
    const startDate = new Date(+year1, +month1 - 1, +day1)
    console.log(startDate)
    console.log(this.currDate)

    const [day2, month2, year2] = bought.endDate.split('/')
    const endDate = new Date(+year2, +month2 - 1, +day2)
    console.log(endDate)

    if (startDate < this.currDate && endDate > this.currDate) {
      status = -1 // w trakcie
    } else if (startDate >= this.currDate) {
      status = 0 // nadchodząca
    }
    return status
  }
}
