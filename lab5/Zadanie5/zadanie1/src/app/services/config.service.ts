import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../interfaces/IPosts';
import { HttpHeaders } from '@angular/common/http';

// const headers = {
//   headers: new HttpHeaders({
//     'Content-type': 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  path: string = "https://jsonplaceholder.typicode.com/posts"
  posts: Post[] = []


  constructor(private http: HttpClient) { }

  getPosts(){
    this.http.get<Post[]>(this.path)
    .subscribe((data: Post[]) => this.posts = data)
  }

  addPost(post: Post) {
    this.http.post<Post>(this.path, post)
    .subscribe((data: Post) => this.posts.push(data))
  }
}

