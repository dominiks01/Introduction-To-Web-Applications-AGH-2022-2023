import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Photo } from '../interfaces/IPhotos';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  path: string = "https://jsonplaceholder.typicode.com/photos/?_limit=100"
  pathAll: string = "https://jsonplaceholder.typicode.com/photos/"
  photos: Photo[] = []

  constructor(private http: HttpClient) { }

  getPhotos() {
    this.http.get<Photo[]>(this.path)
    .subscribe((data: Photo[]) => this.photos = data)
  }

  getPhoto(id: number) {
    console.log(this.http.get<Photo>(this.pathAll + id))
    return this.http.get<Photo>(this.pathAll + id)
    // return this.photosMap.get(albumId)?.get(id)
  }
}
