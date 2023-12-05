import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassesService } from 'src/app/services/classes.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-or-edit-class',
  templateUrl: './add-or-edit-class.component.html',
  styleUrls: ['./add-or-edit-class.component.css'],
})
export class AddOrEditClassComponent implements OnInit {
  title: string = '';
  addClassForm!: FormGroup;
  courseId: string = '';
  teacherId: string = '';
  allCourses: any = [];
  allStudents: any = [];
  allTeachers: any = [];
  studentsSelected: any = [];

  constructor(
    private courseService: CourseService,
    private classService: ClassesService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.router.url == '/addClass'
      ? (this.title = 'Add class')
      : (this.title = 'Update class');

    this.courseService.getAllCourses().subscribe(
      (success) => {
        console.log(success);
        this.allCourses = success.courses;
        this.courseId = success.courses[0]._id;

        this.userService.getAllStudents().subscribe(
          (success) => {
            console.log(success);
            this.allStudents = success.users;
            this.userService.getAllTeachers().subscribe(
              (success) => {
                console.log(success);
                this.allTeachers = success.users;
                this.teacherId = success.users[0]._id;
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
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.router.url == '/addClass') {
      this.addClassForm = this.formBuilder.group({
        name: ['', [Validators.required]],

        description: ['', [Validators.required]],
      });
    } else {
    }
  }

  addClass() {
    this.addClassForm.value.courseId = this.courseId;
    this.addClassForm.value.teacherId = this.teacherId;
    this.addClassForm.value.students = this.studentsSelected;
    console.log(this.addClassForm.value.students);

    this.classService.addClass(this.addClassForm.value).subscribe(
      (success) => {
        if (success.message == 'class added succesfully') {
          alert('class added succesfully');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editClass() {}

  selectCourse(event: any) {
    this.courseId = event.target.value;
  }

  selectTeacher(event: any) {
    this.teacherId = event.target.value;
  }
  selectStudent(event: any, id: string) {
    // console.log(event);
    // console.log(id);
    // console.log(event.target.checked);
    if (event.target.checked) {
      this.studentsSelected.push(id);
    } else {
      this.studentsSelected = this.studentsSelected.filter(
        (myId: string) => myId != id
      );
    }
  }
}
