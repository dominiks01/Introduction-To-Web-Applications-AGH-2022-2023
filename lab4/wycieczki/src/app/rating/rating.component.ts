import { __values } from 'tslib';
import { RatingData } from '../ratingData';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../dataservice';
import { Router } from '@angular/router';
import {AbstractControl,FormBuilder,FormControl,FormGroup,} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Component,Output,EventEmitter,OnInit,OnDestroy} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnDestroy{
  faStar = faStar;
  ratingForm!: FormGroup;

  value: number = 0;

  name!: String;
  country!: String;
  startDate!: String;
  endDate!: String;
  price!: String;
  description!: String;
  ImagePath!: String;

  constructor(public dataservice: DataService, public activatedRoute: ActivatedRoute, public router: Router) {}


  ngOnInit():void {
    this.ratingForm = new FormGroup({
      //rating: new FormControl(),
      comment: new FormControl(),
    });

    this.name = Object.values(this.activatedRoute.params)[6]['name'];
    this.country = Object.values(this.activatedRoute.params)[6]['country'];
    this.startDate = Object.values(this.activatedRoute.params)[6]['startDate'];
    this.endDate = Object.values(this.activatedRoute.params)[6]['endDate'];
    this.price = Object.values(this.activatedRoute.params)[6]['price'];
    this.ImagePath = Object.values(this.activatedRoute.params)[6]['ImagePath'];
    this.description = Object.values(this.activatedRoute.params)[6]['description'];
  }

  validateRating(form: any) : boolean{
    return form.value['comment']  != null
        // form.value['rating'] != null  &&
  }

  ngOnDestroy(): void {
  }

  update(value: number){
    this.value = value;

    let cpyValue = this.value;
    let collections = document.getElementsByClassName("starIcon");

    for(let i = 0; i<5; ++i){
      if(i< cpyValue)
        (collections[i] as HTMLElement).style.color = "gold";
      else
        (collections[i] as HTMLElement).style.color = "black";
    }
  }

  submit(){
    if(this.validateRating(this.ratingForm)){
      this.dataservice.tripData.forEach((element) => {
        if(element.name == this.name){
          element.ratings.push(new RatingData(this.value, this.ratingForm.value['comment']  ))

          let average = 0;
          let i = 0;

          element.ratings.forEach((element) => {
            average += element.rating;
            i += 1;
          })

          element.averageRatings = average/i;
        }
      })
    }
    this.router.navigate(['/home']);
  }

  cancel(){
    this.router.navigate(['/home']);
  }
}
