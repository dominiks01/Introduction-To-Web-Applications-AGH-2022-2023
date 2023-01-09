import { Photo } from './../interfaces/IPhotos';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Data } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements OnInit, OnDestroy {

  data!: Photo;

  constructor(public activatedRoute: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.data = Object.values(this.activatedRoute.params)[6];
  }

  ngOnDestroy(): void {

  }
}
