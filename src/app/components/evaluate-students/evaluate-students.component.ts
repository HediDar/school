import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from 'src/app/services/classes.service';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-evaluate-students',
  templateUrl: './evaluate-students.component.html',
  styleUrls: ['./evaluate-students.component.css'],
})
export class EvaluateStudentsComponent implements OnInit {
  title: string = '';
  myClass: any = '';
  myEvaluations: any = [];
  constructor(
    private classService: ClassesService,
    private evaluationService: EvaluationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.classService
      .getClassById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (success) => {
          console.log(success);
          this.myClass = success.class;
          this.title = 'Evaluate class named: ' + success.class.name;

          for (let i = 0; i < this.myClass.students.length; i++) {
            this.evaluationService
              .getEvaluationByIdStudentAndClass(
                this.myClass.students[i]._id,
                this.myClass._id
              )
              .subscribe(
                (success) => {
                  console.log(success);
                  if (!success.message) {
                    this.myEvaluations.push(success.evaluation);
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getDefaultValueEvaluation(idStudent: string) {
    let found: any;

    if (this.myEvaluations.length > 0) {
      found = this.myEvaluations.find((element: any) => {
        return element.student == idStudent;
      });
    }

    if (found) {
      return found.evaluation;
    } else return '';
  }

  getDefaultValueMark(idStudent: string) {
    let found: any;
    if (this.myEvaluations.length > 0) {
      found = this.myEvaluations.find((element: any) => {
        return element.student == idStudent;
      });
    }
    if (found) {
      return found.mark;
    } else return 0;
  }

  evaluateStudent(
    studentId: string,
    mark: string,
    evaluation: string,
    idStudent: string
  ) {
    let found: any;
    let myMark;
    if (mark == '') {
      myMark = 0;
    } else {
      myMark = mark;
    }

    if (this.myEvaluations.length > 0) {
      found = this.myEvaluations.find((element: any) => {
        return element.student == idStudent;
      });
    }

    if (!found) {
      this.evaluationService
        .addOrEditEvaluation({
          evaluation: evaluation,
          mark: myMark,
          student: studentId,
          class: this.myClass._id,
        })
        .subscribe(
          (success) => {
            console.log(success);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.evaluationService
        .addOrEditEvaluation({
          evaluation: evaluation,
          mark: myMark,
          student: studentId,
          class: this.myClass._id,
          idEvaluation: found._id,
        })
        .subscribe(
          (success) => {
            console.log(success);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
