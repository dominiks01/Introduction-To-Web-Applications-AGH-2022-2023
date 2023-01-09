import { Pipe, PipeTransform } from '@angular/core';
import { BoughtTrip } from '../IBoughtTrip';


@Pipe({
  name: 'historyFilter'
})
export class HistoryFilterPipe implements PipeTransform {

  transform(boughtTrips: BoughtTrip[], during: boolean, upcoming: boolean, completed: boolean): BoughtTrip[] {
    console.log('essssssssssssssssssssa')
    let save = boughtTrips
    console.log(boughtTrips)
    if (!boughtTrips) {
      return []
    }
    if (!during && !upcoming && !completed) {
      return boughtTrips
    }

    if (!during) {
      boughtTrips = boughtTrips.filter(trip => trip.status !== -1) 
      console.log(boughtTrips)
    }
    if (!upcoming) {
      boughtTrips = boughtTrips.filter(trip => trip.status !== 0) 
      console.log(boughtTrips)
    }
    if (!completed) {
      boughtTrips = boughtTrips.filter(trip => trip.status !== 1) 
      console.log(boughtTrips)
    }
    return boughtTrips
  }

}
