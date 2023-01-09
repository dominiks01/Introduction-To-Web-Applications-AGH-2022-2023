import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms'
import {Validators } from '@angular/forms'
import { debounceTime} from 'rxjs/operators';
import { Post } from '../Iposts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  @Input() id = 0
  @Output() formSubmitPost = new EventEmitter<Post>()
  postForm !: FormGroup

  posts: Post[] = []

  formErrors = {
    postName: '',
    postTripName: '',
    postStartDate: '',
    postShortDesc: '',
  }

  private validationMessages = {
    postName: {
      required: 'Nazwa jest wymagana!',
      minlength: 'Minimum 3 znaki.'
    },
    postTripName: {
      required: 'Nazwa wycieczki jest wymagana!',
      pattern: 'Poprawny format nazwy to np. "Gorąca Antarktyda".'

    },
    postShortDesc: {
      required: 'Opis jest wymagany!',
      minlength: 'Minimum 20 znaków.',
      maxlength: 'Maksimum 500 znaków.'
    },
  }

  constructor(private formBuilder : FormBuilder) {
    
   }

  addNewItem(newPost: Post) {
    this.formSubmitPost.emit(newPost)
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      postTripName: ['', [Validators.required, Validators.pattern('[A-Z]{1}[a-złćźężąóu]+[ ][A-Z]{1}[a-złćźężąóu]+')]],
      postName: ['', [Validators.required, Validators.minLength(3)]],
      postStartDate: [''],
      postShortDesc: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
    })
    this.postForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged()
    })
    this.onControlValueChanged()
  }

  onControlValueChanged() : void {
    const form = this.postForm

    for (let field in this.formErrors) {
      this.formErrors[field as keyof typeof this.formErrors]= ''
      let control = form.get(field)
      
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field as keyof typeof this.validationMessages]
        console.log(validationMessages)
        for (const key in control.errors) {
          console.log(key)
          console.log(validationMessages[key as keyof typeof validationMessages])
          this.formErrors[field as keyof typeof this.formErrors] += validationMessages[key as keyof typeof validationMessages];
        }
      }
      console.log(this.formErrors)
    }
  }


  makeNewPost() {
    console.log(this.postForm)
      if (!this.postForm.valid) {
        return
      }
    this.id += 1
    let newPost = {
      id: this.id,
      name: this.postForm.get('postName')!.value,
      tripName: this.postForm.get('postTripName')!.value,
      startDate: this.postForm.get('postStartDate')!.value,
      shortDesc: this.postForm.get('postShortDesc')!.value,
    } as Post
    this.addNewItem(newPost)
    this.postForm.reset()
  }
}

