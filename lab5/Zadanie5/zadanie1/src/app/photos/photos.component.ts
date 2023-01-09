import { Component, OnInit } from '@angular/core';
import { Photo } from '../interfaces/IPhotos';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{

  constructor(public data: PhotosService) {}

  ngOnInit(): void {
      this.data.getPhotos()
  }

}
