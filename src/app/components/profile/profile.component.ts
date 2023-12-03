import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  id: any = '';
  profileForm!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const jwt = sessionStorage.getItem('token');
    let user: any;
    if (jwt) {
      user = this.decodeToken(jwt);
    }
    this.userService.getUserById(user.id).subscribe(
      (success) => {
        console.log(success);
        this.user = success.user;
        this.profileForm = this.formBuilder.group({
          firstName: [this.user.firstName, [Validators.required]],
          lastName: [this.user.lastName, [Validators.required]],
          email: [this.user.email, [Validators.required, Validators.email]],
          telephone: [this.user.telephone, [Validators.required]],
          oldPassword: ['', [Validators.required]],
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  decodeToken(token: any) {
    return jwt_decode(token);
  }

  saveChanges() {
    this.profileForm.value.id = this.user._id;
    this.userService.editProfile(this.profileForm.value).subscribe(
      (success) => {
        console.log(success.message);
        if (success.message == 'user modified succesfully') {
          alert('your profile has been modifiled');
        } else if (success.message == 'Inexistant user') {
          alert('Your profile has been deleted');
        } else if (success.message == 'Email already in use') {
          alert('Email already in use');
        } else if (success.message == 'Phone already in use') {
          alert('Phone already in use');
        } else if (success.message == 'please check old pwd') {
          alert('please check old pwd');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
