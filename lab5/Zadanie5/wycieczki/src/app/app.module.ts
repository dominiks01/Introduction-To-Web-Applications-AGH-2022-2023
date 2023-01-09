import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { AddingTripComponent } from './adding-trip/adding-trip.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TripFiltersComponent } from './trip-filters/trip-filters.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StartComponent } from './start/start.component';
import { BasketComponent } from './basket/basket.component';
import { HeaderComponent } from './start/header/header.component';
import { FooterComponent } from './start/footer/footer.component';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { HistoryComponent } from './history/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleTripViewComponent } from './single-trip-view/single-trip-view.component';
import { PostsComponent } from './posts/posts.component';
import { DisplayPostsComponent } from './display-posts/display-posts.component';
import { HistoryFilterPipe } from './pipes/history-filter.pipe';
import { BasketInfoComponent } from './basket-info/basket-info.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    AddingTripComponent,
    TripRatingComponent,
    TripFiltersComponent,
    NavbarComponent,
    StartComponent,
    BasketComponent,
    HeaderComponent,
    FooterComponent,
    HistoryComponent,
    PageNotFoundComponent,
    SingleTripViewComponent,
    PostsComponent,
    DisplayPostsComponent,
    HistoryFilterPipe,
    BasketInfoComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
