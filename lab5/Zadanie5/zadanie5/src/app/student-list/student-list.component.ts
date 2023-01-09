import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],

})
export class StudentListComponent implements OnInit {

  students: any;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudentsList();
  }

  getStudentsList() {
    this.studentService.getStudentsList().subscribe(change => {
      this.students = []
      for (let student of change) {
        this.students.push({
          name: student.name,
          age: student.age,
          key: student.key
        });
      }
    });
  }

  deleteStudents() {
    this.studentService.deleteAll()
  }

}
