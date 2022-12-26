import { TripData } from './tripData';
import { RatingData } from './ratingData';

export class DataService {
  constructor(){
    fetch('./assets/tripInfo.json')
      .then((res) => res.json())
      .then((json) => {
        for(let i = 0; i < json["trips"].length; ++i){

          let nextTrip =  new TripData (
             json["trips"][i]['name'],
             json["trips"][i]['country'],
             json["trips"][i]['startDate'],
             json["trips"][i]['endDate'],
             json["trips"][i]['price'],
             json["trips"][i]['quantity'],
             json["trips"][i]['ImagePath'],
             json["trips"][i]['description']
           )

          this.tripData.push(nextTrip);
        }
      });
  }

  public tripData: TripData[] = [];
  public basketSum: number = 0;
}
