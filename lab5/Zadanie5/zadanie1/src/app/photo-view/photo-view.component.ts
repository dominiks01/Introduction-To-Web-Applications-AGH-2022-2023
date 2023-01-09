import { Component, OnInit } from '@angular/core';
import { Photo } from '../interfaces/IPhotos';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../services/photos.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public data: PhotosService) {
    console.log(this.photo)
  }

  id!: any
  photo!: any

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.id = params.get('id'))
    this.data.getPhoto(this.id).subscribe(data => this.photo = data)
    console.log(this.data.getPhoto(this.id))
    console.log('essa')
    console.log(this.photo +' '+ this.id)
    console.log('essa')
  }

}
