import { RatingData } from './ratingData';
export class TripData {

  name!:        string;
  country!:     string;
  startDate!:   string;
  endDate!:     string;
  price!:       number;
  quantity!:    number;
  ImagePath!:   string;
  description!: string;
  ratings!:     RatingData[];
  averageRatings: number = 0;
  startQuantity: number

  constructor(    name: string, country: string,  startDate: string, endDate: string,
                  price: number,  quantity: number, ImagePath: string,  description: string) {

      this.name = name;
      this.country = country;
      this.startDate = startDate;
      this.endDate = endDate;
      this.price = price;
      this.quantity = quantity;
      this.ImagePath = ImagePath;
      this.description = description;
      this.ratings = [];
      this.startQuantity = this.quantity;

      var randomValue = Math.floor(Math.random() * 5 + 1);
      this.averageRatings = randomValue;
      this.ratings.push(new RatingData(randomValue, "2/10"));
  }
}
