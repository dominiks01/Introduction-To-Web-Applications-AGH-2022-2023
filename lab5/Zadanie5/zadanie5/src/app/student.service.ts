import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  daneRef = this.db.collection("students");
  ids = 0;
  constructor(private db: AngularFirestore) {
  }

  createStudent(student: Student): void {
    student.key = this.ids + '';
    this.ids += 1;
    this.daneRef.doc(student.key).set({...student});
  }

  updateStudent(key: string, value: any) {
    this.daneRef.doc(key).update({name: value.name, age: value.age});
  }

  deleteStudent(key: string) {

    this.daneRef.doc(key).delete()
  }

  getStudentsList():Observable<any> {
    return this.daneRef.valueChanges();
  }

  deleteAll() {
    const ref = this.db.collection('students');
    ref.get().toPromise().then(res => {
      res?.forEach(element => {
        element.ref.delete();
      });
    });
        
    
  }
    
}
