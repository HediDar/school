import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/validators/confirmPWD';
import { UserService } from 'src/app/services/user.service';

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
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

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

    if (this.role !== 'parent') {
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
    } else {
      this.signupForm = this.formBuilder.group(
        {
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          adresse: ['', [Validators.required]],
          telephone: ['', [Validators.required]],
          childTelephone: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: [''],
          file: [''],
        },
        {
          validator: MustMatch('password', 'confirmPassword'),
        }
      );
    }
  }
  signup() {
    if (this.role == 'teacher') {
      this.signupForm.value.speciality = this.speciality;
      this.signupForm.value.status = 'NOK';
    }
    this.signupForm.value.role = this.role;

    this.userService
      .signUp(this.signupForm.value, this.signupForm.value.file)
      .subscribe(
        (success) => {
          console.log(success);
          if (success.message == 'email already in use') {
            alert('Email already in use!');
          } else if (success.message == 'phone number already in use') {
            alert('Phone number already in use!');
          } else if (
            success.message == 'You must select a file for your user'
          ) {
            alert('You must select a file for your user!');
          } else if (
            success.message == 'There is no student subscribed with this number'
          ) {
            alert('There is no student subscribed with this number!');
          } else {
            alert("you've been subscribed succesfully!");
            this.router.navigate(['login']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
    console.log(this.speciality);
    
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
  }
}
