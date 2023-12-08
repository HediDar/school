import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { EvaluationService } from 'src/app/services/evaluation.service';
@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css'],
})
export class StudentClassesComponent implements OnInit {
  myClasses: any = [];
  studentId: string = '';
  constructor(
    private evaluationService: EvaluationService,
    private classesService: ClassesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let student: any = this.decodeToken(sessionStorage.getItem('token'));
    let firstSuccess: any;
    this.classesService.getClassesByIdStudent(student.id).subscribe(
      (success) => {
        console.log(success);
        if (success.message == 'data found') {
          firstSuccess = success.classes;
          for (let i = 0; i < firstSuccess.length; i++) {
            this.evaluationService
              .getEvaluationByIdStudentAndClass(student.id, firstSuccess[i]._id)
              .subscribe(
                (success) => {
                  console.log(success);
                  if (success.message == 'no evaluation') {
                    firstSuccess[i].evaluation = 'not found';
                  } else firstSuccess[i].evaluation = success.evaluation;

                  if (i == firstSuccess.length - 1) {
                    this.myClasses = firstSuccess;
                    console.log(this.myClasses);
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  decodeToken(token: any) {
    return jwt_decode(token);
  }

  markColor(mark: number) {
    if (mark > 15 && mark <= 20) {
      return 'green';
    } else if (mark >= 10 && mark <= 15) {
      return 'blue';
    } else return 'red';
  }
}
