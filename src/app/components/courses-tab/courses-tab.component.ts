import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css'],
})
export class CoursesTabComponent implements OnInit {
  title: string = '';
  courses: any = [];
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.router.url == '/myCourses'
      ? (this.title = 'My Courses')
      : (this.title = 'all Courses');

    if (this.router.url == '/myCourses') {
      this.getMyCourses();
    } else this.getAllCourses();
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourseById(id).subscribe(
      (success) => {
        console.log(success);
        if (success.message == 'deleted succesfully') {
          alert('Course deleted succesfully!');

          if (this.router.url == '/myCourses') {
            this.getMyCourses();
          } else this.getAllCourses();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMyCourses() {
    const jwt = sessionStorage.getItem('token');
    let user: any;
    if (jwt) {
      user = this.decodeToken(jwt);
    }
    this.courseService.getCoursesByIdTeacher(user.id).subscribe(
      (success) => {
        console.log(success);
        this.courses = success.teacherCourses;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (success) => {
        console.log(success);
        this.courses = success.courses;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCourse(id: string) {
    this.router.navigate([`editCourse/${id}`]);
  }

  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
