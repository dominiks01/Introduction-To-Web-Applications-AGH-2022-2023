import { offerView } from './offer-view/offer-view.component';
import { NewTrip } from './new-trip/new-trip.component';
import { RatingComponent } from './rating/rating.component';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirstPipePipe } from './pipes/first-pipe.pipe';
import { PricePipePipe } from './pipes/price-pipe.pipe';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { DataService } from './services/dataservice';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { GetQuantityPipe } from './pipes/get-quantity.pipe';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environment/environment';
import { HttpClientModule } from '@angular/common/http';
import { MainViewComponent } from './main-view/main-view.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { PostComponent } from './post/post.component';
import { HistoryComponent } from './history/history.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { TripManagerComponent } from './trip-manager/trip-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    offerView,
    TripCardComponent,
    FirstPipePipe,
    PricePipePipe,
    NewTrip,
    RatingComponent,
    ShoppingBasketComponent,
    GetQuantityPipe,
    MainViewComponent,
    TripInfoComponent,
    PostComponent,
    HistoryComponent,
    RegisterComponent,
    LoginComponent,
    AdminConsoleComponent,
    TripManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule{
}
