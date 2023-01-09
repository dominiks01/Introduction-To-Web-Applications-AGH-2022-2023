import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student!: Student;
  modifing: any;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.modifing =  {name: this.student.name, age: this.student.age}
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.student.key);
  }

  updateStudent() {
    this.studentService.updateStudent(this.student.key, this.modifing)
  }

}
