import { Injectable, SimpleChange } from '@angular/core';
import { Observable, elementAt, take, observable, subscribeOn } from 'rxjs';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { I18NHtmlParser, ThisReceiver } from '@angular/compiler';
import { AccountDataService } from './account-data.service';
import { doc, setDoc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  tripsRef = this.db.collection('trips');
  history = this.db.collection('history');

  next!: number
  boughtID!: number
  trips: object[] = [];
  basket: object[] = [];

  historyTrips: object[] = [];

  posts: any = [];
  postId: number = 0;

  histortTripID: number = 0;

  constructor(private db: AngularFirestore, public AccountDataService: AccountDataService) {
    this.trips = [];
    this.updateHistory();
  }

  updateHistory(){
    this.historyTrips = [];

    this.history.get(this.AccountDataService.currUserID).subscribe(elem => {
      this.db.collection('history').doc(this.AccountDataService.currUserID).collection("Personal Histroy").get().subscribe(elem =>{
        this.histortTripID = elem.size + 1;
        for (var i in elem.docs) {
          this.historyTrips.push(elem.docs[i].data())
      }
      })})
  }

  getTrips() : Observable<any>{
    return this.tripsRef.valueChanges()
  }

  getHistory(): Observable<any>{
    return this.db.collection('history').doc(this.AccountDataService.currUserID).collection("Personal Histroy").valueChanges();
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

  removeTrip(id: number){
    this.tripsRef.doc(id+'').delete();
  }

  resetData(){
    let resertArray: object[] = [];

    fetch('./assets/tripInfo.json')
    .then((res) => res.json())
    .then((json) => {
      for(let i = 0; i < json["trips"].length; ++i){

        let startDate = json["trips"][i]['startDate'];
        let endDate = json["trips"][i]['endDate'];

        let date: Date = new Date();
        let firstDate: Date = new Date(startDate);
        let secondDate: Date = new Date(endDate);

        let status;

        if(date.getTime() < firstDate.getTime())
          status = "Czeka na rozpoczęcie"
        else if(date.getTime() > secondDate.getTime())
          status = "Archiwalna"
        else
          status = "W trakcie"

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
           status: status
        }

        this.addTrip(nextTrip);
      }
    });

    for (let i= 0; i < resertArray.length; i++) {
           this.addTrip(resertArray[i])
         }
  }

  addToBasket(object:object){
    for(let i = 0; i < this.basket.length;i++)
      if(this.basket[i]['ID' as keyof object] == object['ID' as keyof object]){
        this.basket[i] = object;
        return;
      }
    this.basket.push(object);
  }

  getSum(){
    let sum = 0;
    this.basket.forEach(element => {
      sum += (element['reserved' as keyof object] * element['price' as keyof object])
    })

    return sum;
  }

  getHistoryTrips(){
    return this.historyTrips;
  }

  buy(object:any){
    var now: String = new Date().toLocaleString();
      this.db.collection("history").doc(this.AccountDataService.currUserID).collection("Personal Histroy").doc(this.histortTripID+"").set({...object, now});
      this.histortTripID +=1
  }

}
