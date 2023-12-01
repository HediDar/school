import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/validators/confirmPWD';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  title: string = '';
  role: string = 'teacher';
  speciality: string = 'web';
  filePreview: any = null;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url == '/signupStudent') {
      this.title = 'Signup student';
      this.role = 'student';
    } else if (this.router.url == '/signupTeacher') {
      this.title = 'Signup teacher';
      this.role = 'teacher';
    } else if (this.router.url == '/signupParent') {
      this.title = 'Signup parent';
      this.role = 'parent';
    } else if (this.router.url == '/signupAdmin') {
      this.title = 'Signup admin';
      this.role = 'admin';
    }

    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        adresse: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
        file: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    console.log(this.role);
  }
  signup() {
    console.log(this.signupForm.value);
  }
  login() {
    this.router.navigate(['login']);
  }

  changeSignUp(role: string) {
    if (role == 'student') this.router.navigate(['signupStudent']);
    else if (role == 'teacher') this.router.navigate(['signupTeacher']);
    else if (role == 'parent') this.router.navigate(['signupParent']);
  }

  selectSpeciality(event: any) {
    this.speciality = event.target.value;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    //update value of the form
    this.signupForm.patchValue({ file: file });
    this.signupForm.updateValueAndValidity();
    console.log('here file', file);

    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    // let fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   console.log(fileReader.result);
    //   this.filePreview = fileReader.result;
    // };
    // fileReader.readAsText(file);
  }
}
