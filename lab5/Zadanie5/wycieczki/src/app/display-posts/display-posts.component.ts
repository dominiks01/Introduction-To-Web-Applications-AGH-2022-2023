import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../Iposts';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css']
})
export class DisplayPostsComponent implements OnInit{


  posts: Post[] = []
  destPost!: Post[]
  id!: number
  @Input() tripName!: string 

  constructor() {}

  ngOnInit(): void {
    console.log(this.posts)
    fetch('./assets/posts.json').then(res => res.json())
    .then(json => {
      for (let i in json["posts"]) {
        this.id = json["posts"][i]["id"]
        this.posts.push({
          id: json["posts"][i]["id"],
          name: json["posts"][i]["name"],
          tripName: json["posts"][i]["tripName"],
          startDate: json["posts"][i]["startDate"],
          shortDesc: json["posts"][i]["shortDesc"],
        } as Post)
      }
    });
  }

  addingSubmitedPost(newPost: Post) {
    console.log(newPost)
    this.posts.push(newPost)
  }

  getTripName(des: string) {
    this.destPost = []
    for (let post of this.posts) {
      if (post.tripName === des) {
        this.destPost.push(post)
      }
    }
    return this.destPost
  }

  getID() {
    return this.id
  }
}
