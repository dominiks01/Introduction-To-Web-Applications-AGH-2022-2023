import { Injectable } from '@angular/core';
import { Observable, elementAt, take } from 'rxjs';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tripsRef = this.db.collection('trips');
  next!: number
  boughtID!: number
  trips: object[] = [];
  basket: any = {};

  posts: any = [];
  postId: number = 0;

  constructor(private db: AngularFirestore) {
    //this.tripsRef.get().subscribe(change =>{ this.next = change.size});
    this.getTrips().subscribe(element =>{
      for(let i of element)
        this.trips.push(i);
    });
    this.posts.push({
      description: "ALamakotakALamakotakasdALamakotakasdasdALamakotakALamakotakasdALamakotakasdasdALamakotakALamakotakasdALamakotakasdasdALamakotakALamakotakasdALamakotakasdasd",
      id: 1,
      name: "Dominik",
      startDate: "2023-01-07",
      tripName: "XDDDD",
      rating: 4
    })
    console.log(this.posts);
  }

  public basketSum: number = 0;

  getTrips() : Observable<any>{
    return this.tripsRef.valueChanges()
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

        console.log(nextTrip);
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
}
