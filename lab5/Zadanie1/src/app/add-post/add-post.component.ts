import { Photo } from './../interfaces/IPhotos';
import { DataService } from './../config/data.service';
import { Post } from './../interfaces/IPost';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { validateArgCount } from '@firebase/util';
import { Validator } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{

  postForm!: FormGroup;
  errorMessage!: String;

  constructor(public data: DataService, public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: new FormControl("", [ Validators.required, Validators.minLength(5)]),
      description: new FormControl("", [ Validators.required, Validators.minLength(5)]),
      userID: new FormControl("",[ Validators.required, Validators.minLength(1),  Validators.pattern("^[0-9]*$")])
    })
  }

  onSubmit() {

    console.log(this.postForm.value['title']);

    if(this.postForm.valid){

      let newPost: Post;

      var poped = this.data.posts[this.data.posts.length - 1];
      var nextId = poped?.id;

      newPost = {
        title : this.postForm.value['title'],
        body : this.postForm.value['description'],
        id :  (nextId==undefined)? 1: nextId + 1,
        userId: parseInt(this.postForm.value['userID'])
      }
      this.data.addPost(newPost);
      console.log(this.data.posts);
    }
  }

  get title() { return this.postForm.get('title'); }
  get description() { return this.postForm.get('description'); }
  get ID() { return this.postForm.get('userID '); }


}
