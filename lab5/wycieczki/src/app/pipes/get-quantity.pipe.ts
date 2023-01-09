import { TripData } from '../tripData';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getQuantity'
})
export class GetQuantityPipe implements PipeTransform {

  transform(trips: TripData[], value: number): TripData[] {
    if(!trips)
      return [];
    return [];

    // return trips.filter(trip => {
    //   return trip.startQuantity - trip.quantity > value;
    // });
  }

}
