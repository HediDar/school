import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import jwt_decode from 'jwt-decode';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css'],
})
export class StudentClassesComponent implements OnInit {
  myClasses: any = [];
  studentId: string = '';
  searchForm!: FormGroup;
  searchInput: number = 0;
  showParent: boolean = false;
  notFoundForParentBool: boolean = false;
  title: string = '';
  constructor(
    private evaluationService: EvaluationService,
    private classesService: ClassesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/childClasses') {
      this.showParent = true;
      this.title = 'Search child classes';
    }

    if (this.router.url == '/studentClasses') {
      this.title = 'My affected classes';
      let student: any = this.decodeToken(sessionStorage.getItem('token'));
      let firstSuccess: any;
      this.classesService.getClassesByIdStudent(student.id).subscribe(
        (success) => {
          console.log(success);
          if (success.message == 'data found') {
            firstSuccess = success.classes;
            for (let i = 0; i < firstSuccess.length; i++) {
              this.evaluationService
                .getEvaluationByIdStudentAndClass(
                  student.id,
                  firstSuccess[i]._id
                )
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
  searchStudent() {
    this.notFoundForParentBool = false;
    let firstSuccess: any;
    this.classesService.getClassesByStudentPhone(this.searchInput).subscribe(
      (success) => {
        console.log(success);
        if (success.message == 'data found') {
          firstSuccess = success.classes;
          let stuId = success.idStudent;
          for (let i = 0; i < firstSuccess.length; i++) {
            this.evaluationService
              .getEvaluationByIdStudentAndClass(stuId, firstSuccess[i]._id)
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
        } else this.notFoundForParentBool = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
