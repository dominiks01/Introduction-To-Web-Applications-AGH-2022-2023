import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Trip } from '../Trip';
import { Post } from '../Iposts';

@Component({
  selector: 'app-single-trip-view',
  templateUrl: './single-trip-view.component.html',
  styleUrls: ['./single-trip-view.component.css']
})
export class SingleTripViewComponent implements OnInit {

  actualCurrency = this.dataService.currency

  trip!: Trip | undefined
  id!: number

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = 0
    this.getTrip()
  }

  getTrip() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getTrips().subscribe(change => {
      for (let trip of change) {
        if (trip.id == this.id) {
          this.trip = trip
        }
      }
    })
  }

  addingTickets() {
    if (this.trip!.maxQuantity > 0) {
      this.trip!.counter += 1
      this.trip!.maxQuantity -= 1
      this.trip!.reserved += 1
    }
    this.dataService.updateQuantity(this.trip!.id, this.trip!.maxQuantity, this.trip!.reserved)
  }

  removingTickets() {
    if (this.trip!.maxQuantity < this.trip!.avaible) {
      this.trip!.counter -= 1
      this.trip!.maxQuantity += 1
      this.trip!.reserved -= 1
    }
    this.dataService.updateQuantity(this!.id, this.trip!.maxQuantity, this.trip!.reserved)
  }

  raitingTrip(rate: number) {
    this.trip!.raitings += 1
    this.trip!.overallRate = +this.trip!.overallRate
    this.trip!.overallRate += rate
  }


  calculateRate(){
    if (this.trip?.raitings != 0){
      return Math.round((this.trip?.overallRate / this.trip!.raitings)*100)/100
    }
    return 0
  }



  printTrip() {
    console.log(this!.trip)
  }
}
