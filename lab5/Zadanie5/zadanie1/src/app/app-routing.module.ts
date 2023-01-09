import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'photos', component: PhotosComponent},
  { path: 'photo-view/:id', component: PhotoViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
