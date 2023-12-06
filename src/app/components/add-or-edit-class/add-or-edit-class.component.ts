import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  courseId2: string = '';
  teacherId: string = '';
  teacherId2: string = '';
  allCourses: any = [];
  allStudents: any = [];
  allTeachers: any = [];
  studentsSelected: any = [];
  dataMissing: boolean = false;
  myClass: any = [];
  counter: number = 0;

  constructor(
    private courseService: CourseService,
    private classService: ClassesService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.url == '/addClass'
      ? (this.title = 'Add class')
      : (this.title = 'Update class');

    this.courseService.getAllCourses().subscribe(
      (success) => {
        this.allCourses = success.courses;
        if (success.courses.length == 0) {
          this.dataMissing = true;
          return;
        }
        this.courseId = success.courses[0]._id;

        this.userService.getAllStudents().subscribe(
          (success) => {
            this.allStudents = success.users;
            if (success.users.length == 0) {
              this.dataMissing = true;
              return;
            }
            this.userService.getAllTeachers().subscribe(
              (success) => {
                this.allTeachers = success.users;
                if (success.users.length == 0) {
                  this.dataMissing = true;
                  return;
                }
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
      this.classService
        .getClassById(this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe(
          (success) => {
            this.myClass = success.class;
            this.addClassForm = this.formBuilder.group({
              name: [success.class.name, [Validators.required]],

              description: [success.class.description, [Validators.required]],
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  addClass() {
    this.addClassForm.value.courseId = this.courseId;
    this.addClassForm.value.teacherId = this.teacherId;
    this.addClassForm.value.students = this.studentsSelected;
    console.log(this.addClassForm.value);

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
  editClass() {
    this.courseId2 == ''
      ? (this.addClassForm.value.courseId = this.courseId)
      : (this.addClassForm.value.courseId = this.courseId2);
    this.teacherId2 == ''
      ? (this.addClassForm.value.teacherId = this.teacherId)
      : (this.addClassForm.value.teacherId = this.teacherId2);

    this.addClassForm.value.students = this.studentsSelected;
    this.addClassForm.value._id =
      this.activatedRoute.snapshot.paramMap.get('id');

    this.classService.updateClass(this.addClassForm.value).subscribe(
      (success) => {
        console.log(success);
        if (success.message == 'class modified succesfully') {
          alert('class modified succesfully');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectCourse(event: any) {
    this.courseId = event.target.value;
    this.courseId2 = event.target.value;
  }

  selectTeacher(event: any) {
    this.teacherId = event.target.value;
    this.teacherId2 = event.target.value;
  }
  selectStudent(event: any, id: string) {
    if (event.target.checked) {
      this.studentsSelected.push(id);
    } else {
      this.studentsSelected = this.studentsSelected.filter(
        (myId: string) => myId != id
      );
    }
  }
  isChecked(id: string) {
    this.counter++;

    const found = this.myClass.students.find(
      (element: any) => element._id == id
    );

    if (found) {
      if (this.counter < 4) {
        this.studentsSelected.push(id);
      }

      return true;
    } else return false;
  }

  isSelectedCourse(id: string) {
    if (this.myClass.course._id == id) {
      this.courseId = id;
      return true;
    } else return false;
  }

  isSelectedTeacher(id: string) {
    if (this.myClass.teacher._id == id) {
      this.teacherId = id;
      return true;
    } else return false;
  }
}
