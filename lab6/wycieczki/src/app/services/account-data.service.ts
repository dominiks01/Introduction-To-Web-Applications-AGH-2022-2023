import { DataService } from './dataservice';
import { ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth, PERSISTENCE } from '@angular/fire/compat/auth';
import { Observable, elementAt } from 'rxjs';
import { Router, TitleStrategy } from '@angular/router';
import { setDoc, doc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { computeMsgId, ThisReceiver } from '@angular/compiler';
import { getAuth } from "firebase/auth"

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  accountRef = this.db.collection('accounts')
  userData: Observable<any>
  currUserID!: any
  loggedUser!: any
  users: any[] = [];
  presistance!: any
  ifLogged!: boolean
  role: string = ""
  angularFa!: any

  constructor(private db: AngularFirestore, private angularFA: AngularFireAuth, private router: Router) {
    this.angularFA = angularFA;
    this.userData = angularFA.authState;
    this.userData.subscribe((user : any) => {
      this.currUserID = user?.uid
      this.accountRef.doc(this.currUserID+"").valueChanges().subscribe(
        elem => {
          this.role = (elem as object)["role" as keyof object]
        }
      )
    })

    this.accountRef.doc(this.currUserID+"").valueChanges().subscribe(
      user => { this.role = (user as object)["role" as keyof object];}
    )
  }

  setPresistence(option: any){
    this.presistance = option
    this.angularFA.setPersistence(this.presistance)
  }

  getRole(){
    return this.role;
  }

  getAccounts(): Observable<any>{
    return this.accountRef.valueChanges();
  }

  isLogged() {
    this.userData.subscribe((user: any) => {
     this.ifLogged = (user !== null)
    })
  }

  SignOut() {
    this.angularFA.signOut();
    this.router.navigate([''])
  }

  registerUser(firstName:string, secondName:string, email:string, password:string){
    this.angularFA.createUserWithEmailAndPassword(email, password).then(
    (result) => {
      this.accountRef.doc(result.user?.uid+"").set({firstName: firstName, secondName: secondName, uid: result.user?.uid});
    }
    )
    return true;
  }

  LogIn(email: string, password: string): boolean {
    this.angularFA.signInWithEmailAndPassword(email, password).then(res => {
        this.currUserID = getAuth().currentUser?.uid;
        this.router.navigate([''])
        return true;
      })
      .catch(err => {
        return false;
      })

      return this.ifLogged;
  }
}

