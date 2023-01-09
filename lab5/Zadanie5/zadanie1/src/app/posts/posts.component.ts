import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Post } from '../interfaces/IPosts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{

  constructor(public data: ConfigService) {
  }

  ngOnInit(): void {
    this.data.getPosts()
  }
}
