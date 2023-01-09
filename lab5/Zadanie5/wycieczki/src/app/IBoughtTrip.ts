import { Data } from "@angular/router"

export interface BoughtTrip {
    id: number
    name: string
    destination: string
    startDate: string
    endDate: string
    boughtDate: Data
    unitPrice: number
    maxQuantity: number
    imageLink1: string,
    bought: number
    status: number //  -1 w trkacie, 0 nadchodząca, 1 odbyła się
  }