import { TripData } from './../tripData';
import { __values } from 'tslib';
import { RatingData } from '../ratingData';
import { DataService } from '../dataservice';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl,FormGroup, FormBuilder} from '@angular/forms';
import {Component,OnInit,OnDestroy} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { debounceTime} from 'rxjs/operators';
import {Validators } from '@angular/forms'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{
  faStar = faStar;
  ratingForm!: FormGroup;
  data!: any;
  value: number = 0;

  constructor(public dataservice: DataService, public activatedRoute: ActivatedRoute, public router: Router,
     public route: ActivatedRoute, private location: Location, private formBuilder : FormBuilder) {}

     formErrors = {
      name: '',
      tripName: '',
      startDate: '',
      description: '',
    }

    private messages = {
      name: {
        required: 'Nazwa jest wymagana!',
        minlength: 'Minimum 5 znaków.',
      },
      tripName: {
        required: 'Nazwa wycieczki jest wymagana!',
        minlength: 'Minimum 3 znaki.',
      },
      startDate: {},
      description: {
        required: 'Opis jest wymagany!',
        minlength: 'Minimum 50 znaków.',
        maxlength: 'Maksimum 500 znaków.'
      },
    }

  ngOnInit():void {
    this.data = Object.values(this.activatedRoute.params)[6];

    this.ratingForm = this.formBuilder.group({
      description:  ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      name:         ['', [Validators.required, Validators.minLength(5)]],
      startDate:    [''],
      tripName:     ['', [Validators.required,, Validators.minLength(3)]],
    });

    this.ratingForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged()
    })
    this.onControlValueChanged()
  }

  onControlValueChanged() : void {
    const form = this.ratingForm;

    for (let field in this.formErrors) {
      this.formErrors[field as keyof typeof this.formErrors]='';
      let control = form.get(field)
      if (control && control.dirty && !control.valid) {

        for (const key in control.errors) {
          this.formErrors[field as keyof typeof this.formErrors] += this.messages[field as keyof object][key as keyof object]
      }
    }
  }
}

  update(value: number){
    this.value = value;
    let collections = document.getElementsByClassName("starIcon");

    for(let i = 0; i<5; ++i)
      (collections[i] as HTMLElement).style.color = (i < value)? "gold":"black";
  }

  getPosts(){
    return this.dataservice.posts;
  }

   submit(){
    if(this.ratingForm.valid){

      let id = this.dataservice.postId + 1;

      let newPost = {
        id: id,
        name: this.ratingForm.get('name')!.value,
        tripName: this.ratingForm.get('tripName')!.value,
        startDate: this.ratingForm.get('startDate')!.value,
        description: this.ratingForm.get('description')!.value,
        rating: this.value
      }

      this.dataservice.addPost(newPost);
      console.log(this.dataservice.posts);
    }
   }

  cancel(): void{
    this.location.back();
  }
}
