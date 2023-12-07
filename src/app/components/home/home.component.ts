import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  courses: any;
  teachers: any;
  constructor(
    private courseSerivce: CourseService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.courseSerivce.getAllCourses().subscribe(
      (success) => {
        console.log(success);
        this.courses = success.courses;
        this.UserService.getAllTeachers().subscribe(
          (success) => {
            console.log(success);
            this.teachers = success.users;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
