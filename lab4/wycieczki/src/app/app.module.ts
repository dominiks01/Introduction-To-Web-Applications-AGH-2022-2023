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
import { FormComponent } from './formTrip/form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TripCardComponent,
    FirstPipePipe,
    PricePipePipe,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{
}
