import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      telephone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.errorMessage = '';
    this.userService.login(this.loginForm.value).subscribe(
      (success) => {
        if (
          success.message == 'check your phone number' ||
          success.message == 'check your password'
        ) {
          this.errorMessage = 'check phone/pwd';
        } else if (success.message == 'Your profile hasnt been approved yet') {
          this.errorMessage = 'Your profile hasnt been approved yet';
        } else if (success.message == 'welcome') {
          sessionStorage.setItem('token', success.token);

          let user: any = this.decodeToken(success.token);
          this.router.navigate(['']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signup(role: string) {
    if (role == 'student') {
      this.router.navigate(['signupStudent']);
    } else if (role == 'teacher') {
      this.router.navigate(['signupTeacher']);
    } else if (role == 'parent') {
      this.router.navigate(['signupParent']);
    }
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
