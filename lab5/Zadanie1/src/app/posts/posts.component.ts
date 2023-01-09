import { DataService } from './../config/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnDestroy():void {};

  ngOnInit(): void {
  };

}
