import { Component, OnInit } from '@angular/core';
import { DataService } from './config/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public data: DataService) {}

  ngOnInit(): void {
    this.data.getPosts();
    this.data.getPhotos();
  }

  title = 'Zadanie1';
}
