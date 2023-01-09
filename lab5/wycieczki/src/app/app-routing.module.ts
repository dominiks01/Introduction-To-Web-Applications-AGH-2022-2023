import { TripInfoComponent } from './trip-info/trip-info.component';
import { offerView } from './offer-view/offer-view.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { RatingComponent } from './rating/rating.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripData } from './tripData';
import { NewTrip } from './new-trip/new-trip.component';
import { MainViewComponent } from './main-view/main-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'offer-view', component: offerView, data: {somedata: Object}},
  {path: 'home', component: MainViewComponent},
  {path: 'new-trip', component: NewTrip},
  {path: 'offer-view/rate-trip', component: RatingComponent, data: {data: Object}},
  {path: 'shopping-basket', component: ShoppingBasketComponent},
  {path: 'offer-view/trip-info', component: TripInfoComponent, data: {data: Object}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
