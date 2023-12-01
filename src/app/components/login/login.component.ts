import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      telephone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    console.log(this.loginForm.value);
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
}
