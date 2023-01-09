import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  submitted = false;
  daneRef!: AngularFireObject<any>;
  
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    
  }

  newStudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    let nameEl = document.getElementById('name') as HTMLInputElement; 
    let ageEl = document.getElementById('age') as HTMLInputElement; 
    this.student.age = ageEl.valueAsNumber;
    this.student.name = nameEl.value;
    this.student.key = nameEl.value + ageEl.value;
    this.studentService.createStudent(this.student);
    this.student = new Student();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
