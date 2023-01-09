import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-basket-info',
  templateUrl: './basket-info.component.html',
  styleUrls: ['./basket-info.component.css']
})
export class BasketInfoComponent implements OnInit{

  constructor(private dataService: DataService) {}

  actualCurrency = this.dataService.currency
  qua!: number
  suma!: number
  ngOnInit(): void {
    this.dataService.getTrips().subscribe(change => {
      this.suma = 0
      this.qua = 0
      for(let trip of change) {
        if (trip.reserved > 0) {
          this.suma += +trip.reserved * trip.unitPrice
          this.qua += +trip.reserved
        }
      }
    })
  }
}
