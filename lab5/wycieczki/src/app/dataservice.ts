import { Injectable } from '@angular/core';
import { Observable, elementAt, take } from 'rxjs';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tripsRef = this.db.collection('trips');
  history = this.db.collection('history');

  next!: number
  boughtID!: number
  trips: object[] = [];
  basket: any = {};

  historyNext: number = 0;

  posts: any = [];
  postId: number = 0;

  constructor(private db: AngularFirestore) {
    this.trips = [];
    this.history.get().subscribe(change =>{ this.historyNext = change.size});
    this.resetData();
  }

  public basketSum: number = 0;

  getTrips() : Observable<any>{
    return this.tripsRef.valueChanges()
  }

  getArray(){
    return this.trips;
  }

  addTrip(trip: object){
    this.tripsRef.doc(trip['ID' as keyof object]+"").set({...trip});
  };

  addPost(post: object){
    this.posts.push(post);
  }

  updateQuantity(id: number, newQuantity: number, reserved: number){
    this.tripsRef.valueChanges().pipe(take(id)).subscribe((item) => {})
    this.tripsRef.doc(id+'').update({available: newQuantity, reserved: reserved });
  }

  printData() {
    return this.tripsRef.valueChanges().subscribe(change => { for(let i of change) console.log(i) });
  }

  removeTrip(id: number){
    this.tripsRef.doc(id+'').delete();
  }

  resetData(){
    let resertArray: object[] = [];

    fetch('./assets/tripInfo.json')
    .then((res) => res.json())
    .then((json) => {
      for(let i = 0; i < json["trips"].length; ++i){
        let nextTrip =  {
           ID: i,
           name: json["trips"][i]['name'],
           country: json["trips"][i]['country'],
           startDate: json["trips"][i]['startDate'],
           endDate: json["trips"][i]['endDate'],
           price: json["trips"][i]['price'],
           quantity: json["trips"][i]['quantity'],
           ImagePath: json["trips"][i]['ImagePath'],
           description: json["trips"][i]['description'],
           reserved: 0,
           available: json["trips"][i]['quantity'],
        }

        this.addTrip(nextTrip);
      }
    });

    console.log(resertArray.length);

    for (let i= 0; i < resertArray.length; i++) {
           this.addTrip(resertArray[i])
         }
  }

  addToBasket(id:number, value: number){
    if(!this.basket[id])
      this.basket[id] = 0;
    this.basket[id] -= value;
  }

  bought(object:object){
    console.log(object);
    this.history.doc(this.historyNext+"").set({...object});
    this.historyNext += 1;
    this.updateQuantity(object['ID' as keyof object], object['quantity' as keyof object], 0);
  }

}
