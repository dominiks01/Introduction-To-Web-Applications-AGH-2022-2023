import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Post } from '../interfaces/IPosts';
import { ConfigService } from '../services/config.service';
import {Validators } from '@angular/forms'
import { debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  post !: FormGroup

  formErrors = {
    postUserId: '',
    postTitle: '',
    postBody: ''
  }

  private validationMessages = {
    postUserId: {
      required: 'Title is required!',
      minlength: 'Length has to be bewteen 1 and 4 characters',
      maxlength: 'Length has to be bewteen 1 and 4 characters',
      pattern: 'Only numbers!'
    },
    postTitle: {
      required: 'Title is required!',
      minlength: 'Length has to be bewteen 10 and 30 characters',
      maxlength: 'Length has to be bewteen 10 and 30 characters'
    },
    postBody: {
      required: 'Body is required!',
      minlength: 'Length has to be bewteen 30 and 100 characters',
      maxlength: 'Length has to be bewteen 30 and 100 characters'
    }
  }

  constructor(public data: ConfigService, public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.post = this.formBuilder.group({
      postUserId: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4), Validators.pattern('[0-9]+')]],
      postTitle: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      postBody: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(100)]]
    })
    this.post.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged()
     })
     this.onControlValueChanged()
  }

  onControlValueChanged() : void {
    const form = this.post

    for (let field in this.formErrors) {
      this.formErrors[field as keyof typeof this.formErrors]= ''
      let control = form.get(field)
      
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field as keyof typeof this.validationMessages]
        // console.log(validationMessages)
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
    if (!this.post.valid) {
      return
    }
    let newPost: Post
    newPost = {
      userId: this.post.get('postUserId')!.value,
      id: this.data.posts.map(post => post.id).sort((a, b) => b - a)[0] + 1,
      title: this.post.get('postTitle')!.value,
      body: this.post.get('postBody')!.value
    }
    this.data.addPost(newPost)
  }

  onSubmit() {
    this.makeNewPost()
    this.post.reset()
  }
}
