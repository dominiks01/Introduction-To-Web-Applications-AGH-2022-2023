import { Component } from '@angular/core';
import { DataService } from '../config/data.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {
  constructor(public data: DataService) {}

  ngOnDestroy():void {};

  ngOnInit(): void {
    this.data.getPhotos()
  };

}
