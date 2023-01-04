import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { RatingComponent } from './rating/rating.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form-trip/form.component';
import { TripData } from './tripData';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: MainPageComponent, data: {somedata: Object}},
  {path: 'form-trip', component: FormComponent},
  {path: 'rate-trip', component: RatingComponent, data: {data: TripData}},
  {path: 'shopping-basket', component: ShoppingBasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
