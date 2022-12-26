import { RatingComponent } from './rating/rating.component';
import { RatingData } from './ratingData';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirstPipePipe } from './pipes/first-pipe.pipe';
import { PricePipePipe } from './pipes/price-pipe.pipe';

import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form-trip/form.component';

import { DataService } from './dataservice';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { GetQuantityPipe } from './pipes/get-quantity.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TripCardComponent,
    FirstPipePipe,
    PricePipePipe,
    FormComponent,
    RatingComponent,
    ShoppingBasketComponent,
    GetQuantityPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule{
}
