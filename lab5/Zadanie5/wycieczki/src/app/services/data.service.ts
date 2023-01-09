import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { Trip } from '../Trip';
import { BoughtTrip } from '../IBoughtTrip';
import { getFirestore, doc, getDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  trips!: Observable<any>
  boughtRef = this.db.collection('bought')
  daneRef = this.db.collection('trips')
  next!: number
  boughtID!: number
  currency = 'USD'


  constructor(private db: AngularFirestore) { 
    this.daneRef.get().subscribe(change => this.next = change.size)
    this.boughtRef.get().subscribe(change => this.boughtID = change.size)
   }

  createTrip(trip: Trip) {
    this.daneRef.doc(trip.id + '').set({...trip})
  }

  addToBought(bought: any) {
    this.boughtRef.doc(bought.id + '').set({...bought})
  }

  getTrips() : Observable<any>{
    return this.daneRef.valueChanges()
  }

  getBought() : Observable<any>{
    return this.boughtRef.valueChanges()
  }

  getReservedTrips() : Observable<any>{
    return this.db.collection('trips', ref => ref.where('reserved', '>', 0)).valueChanges()
  }

  updateQuantity(id: number, quantity: number, reserved:number) { // czy powininem usuwac wycieczkę jak maxQuantity jest 0???
    this.daneRef.doc(id+'').update({maxQuantity: quantity});
    this.daneRef.doc(id+'').update({reserved: reserved});
  }

  updateAvaible(id: number, avaible: number) {
    this.daneRef.doc(id+'').update({ avaible: avaible })
  }

  deleteTrip(trip: Trip) {
    this.daneRef.doc(trip.id + '').delete()
  }

  getID() {
    this.next += 1
    return this.next
  }

  getLastBoughtID() {
    this.boughtID += 1
    return this.boughtID
  }

  updateRate(id: number|undefined, rate: number | null, cnt: number | undefined) {
    if (cnt === undefined){
      return
    }
    this.daneRef.doc(id+'').update({ overallRate: rate })
    this.daneRef.doc(id+'').update({ raitings: cnt+1})
  }


  printData() {
    return this.daneRef.valueChanges().subscribe(change => { for(let i of change) console.log(i) });
  }
}
