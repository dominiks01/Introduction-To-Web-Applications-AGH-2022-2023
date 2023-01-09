import { Photo } from './../interfaces/IPhotos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Post } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  postPath: string = "https://jsonplaceholder.typicode.com/posts"
  photoPath: string = "https://jsonplaceholder.typicode.com/photos"
  posts: Post[] = []
  photos: Photo[] = []


  constructor( @Inject(HttpClient) private http: HttpClient) { }

  getPosts(){
    this.http.get<Post[]>(this.postPath)
    .subscribe((data: Post[]) => this.posts = data)
  }

  addPost(post: Post) {
    this.http.post<Post>(this.postPath, post)
    .subscribe((data: Post) => this.posts.push(data))
  }

  getPhotos(){
    this.http.get<Photo[]>(this.photoPath)
    .subscribe((data: Photo[]) => this.photos = data)
  }

  addPhoto(photo: Photo){
    this.http.post<Photo>(this.photoPath, photo)
    .subscribe((data: Photo) => this.photos.push(data))
  }

}

