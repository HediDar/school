import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-affected-classes',
  templateUrl: './my-affected-classes.component.html',
  styleUrls: ['./my-affected-classes.component.css'],
})
export class MyAffectedClassesComponent implements OnInit {
  myClasses: any = [];
  teacher: any;
  constructor(private classService: ClassesService, private router: Router) {}

  ngOnInit(): void {
    const jwt = sessionStorage.getItem('token');

    if (jwt) {
      this.teacher = this.decodeToken(jwt);
    }
    this.classService.getClassesByIdTeacher(this.teacher.id).subscribe(
      (success) => {
        this.myClasses = success.classes;
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
  evaluateStudents(classId: string) {
    this.router.navigate([`evaluateStudents/${classId}`]);
  }
}
