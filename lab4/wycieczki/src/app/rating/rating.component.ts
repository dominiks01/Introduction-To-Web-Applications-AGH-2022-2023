import { TripData } from './../tripData';
import { __values } from 'tslib';
import { RatingData } from '../ratingData';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../dataservice';
import { Router } from '@angular/router';
import {FormControl,FormGroup,} from '@angular/forms';
import {Component,OnInit,OnDestroy} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnDestroy{
  faStar = faStar;
  ratingForm!: FormGroup;

  data!: TripData;
  value!: number;

  constructor(public dataservice: DataService, public activatedRoute: ActivatedRoute, public router: Router) {}


  ngOnInit():void {
    this.ratingForm = new FormGroup({
      comment: new FormControl(),
    });

    this.data = Object.values(this.activatedRoute.params)[6];
  }

  validateRating(form: any) : boolean{
    return form.value['comment']  != null
  }

  ngOnDestroy(): void {
  }

  update(value: number){
    this.value = value;
    let collections = document.getElementsByClassName("starIcon");

    for(let i = 0; i<5; ++i)
      (collections[i] as HTMLElement).style.color = (i < value)? "gold":"black";

  }

  submit(){
    if(this.validateRating(this.ratingForm)){

      this.dataservice.tripData.forEach((element) => {
        if(element.name == this.data.name){
          element.ratings.push(new RatingData(this.value, this.ratingForm.value['comment']  ))

          let average = element.ratings.reduce((accumulate, curr) => {
              return accumulate + curr.rating;
          }, 0)

          element.averageRatings = average/element.ratings.length;
        }
      })

    }
    this.router.navigate(['/home']);
  }

  cancel(){
    this.router.navigate(['/home']);
  }
}
