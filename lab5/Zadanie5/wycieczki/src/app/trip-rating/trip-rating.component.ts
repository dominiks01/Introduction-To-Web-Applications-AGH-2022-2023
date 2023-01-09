import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Trip } from '../trips/trips.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Data } from '@angular/router';


@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent implements OnInit{

  constructor(private dataService: DataService){}

  ngOnInit(): void {
  }

  @Output() rated = new EventEmitter<number>()

  @Input() tripToRate!: Trip | undefined
  @Input() overallRate = 0
  @Input() raitings = 0


  ctrl = new FormControl<number | null>(null, Validators.required);
  
  voted = false

  registerRate() {
    if (this.voted) {
      return
    }
    this.voted = true
    let val = this.ctrl.value
    this.dataService.updateRate(this.tripToRate?.id, val + this.tripToRate?.overallRate, this.tripToRate?.raitings)
    console.log(val)
    if (val != null){
      this.rated.emit(val)
    }
  }

  calculateRate(){
    if (this.raitings != 0){
      return Math.round((this.overallRate / this.raitings)*100)/100
    }
    return 0
  }
}
