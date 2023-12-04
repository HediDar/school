import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-or-edit-course',
  templateUrl: './add-or-edit-course.component.html',
  styleUrls: ['./add-or-edit-course.component.css'],
})
export class AddOrEditCourseComponent implements OnInit {
  title: string = '';
  addCourseForm!: FormGroup;
  filePreview: any;
  user: any;
  course: any;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const jwt = sessionStorage.getItem('token');

    if (jwt) {
      this.user = this.decodeToken(jwt);
    }

    if (this.router.url == '/addCourse') {
      this.title = 'Add course';
      this.addCourseForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        description: ['', [Validators.required]],
        file: [''],
      });
    } else {
      this.title = 'Edit course';
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      this.courseService.getCourseById(id).subscribe(
        (success) => {
          console.log(success);
          this.course = success.course;

          this.addCourseForm = this.formBuilder.group({
            name: [success.course.name, [Validators.required]],
            duration: [success.course.duration, [Validators.required]],
            description: [success.course.description, [Validators.required]],
            file: [''],
          });

          this.filePreview = success.course.image;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  addCourse() {
    this.addCourseForm.value.teacherId = this.user.id;
    this.courseService
      .addCourse(this.addCourseForm.value, this.addCourseForm.value.file)
      .subscribe(
        (success) => {
          console.log(success);
          if (success.message == 'You must select a file for your user') {
            alert('An image must be selected for this course!');
          } else if (success.message == 'done') {
            alert('Course added succesfully!');
          }
        },
        (error) => {
          if (error.error.message == 'user not found') {
            alert(
              'An admin has deleted your account, please proceed to create a new account!'
            );
          }
          console.log(error);
        }
      );
  }

  editCourse() {
    this.addCourseForm.value.id = this.course._id;
    this.courseService
      .editCourse(this.addCourseForm.value, this.addCourseForm.value.file)
      .subscribe(
        (success) => {
          console.log(success);
          if (success.message == 'course modified succesfully') {
            alert('Course updated succesfully!');
          }
        },
        (error) => {
          if (error.error.message == 'user not found') {
            alert(
              'An admin has deleted your account, please proceed to create a new account!'
            );
          }
          console.log(error);
        }
      );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    //update value of the form
    this.addCourseForm.patchValue({ file: file });
    this.addCourseForm.updateValueAndValidity();
    console.log('here file', file);

    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
