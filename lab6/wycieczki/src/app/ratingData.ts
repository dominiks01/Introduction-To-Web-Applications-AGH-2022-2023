export class RatingData{
  description!: string;
  rating!: number;

  constructor(rating: number, comment: string){
    this.rating = rating;
    this.description = comment;
  }
}
