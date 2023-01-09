import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddingTripComponent } from './adding-trip/adding-trip.component';
import { TripsComponent } from './trips/trips.component';
import { StartComponent } from './start/start.component';
import { BasketComponent } from './basket/basket.component';
import { HistoryComponent } from './history/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleTripViewComponent } from './single-trip-view/single-trip-view.component';

const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  { path: 'adding', component: AddingTripComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'trip-view/:id', component: SingleTripViewComponent},
  { path: 'history', component: HistoryComponent},
  { path: '', component: StartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
