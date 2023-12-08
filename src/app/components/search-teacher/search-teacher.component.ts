import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css'],
})
export class SearchTeacherComponent implements OnInit {
  searchForm!: FormGroup;
  searchInput: string = '';
  noTeachers: string = '';
  teachers: any = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  searchTeachers() {
    if (this.searchInput == '') {
      return;
    }
    this.userService.getTeachersBySpeciality(this.searchInput).subscribe(
      (success) => {
        console.log(success);
        if (success.users.length == 0) {
          this.noTeachers = 'No teachers found';
          this.teachers = [];
        } else {
          this.noTeachers = 'Yes teachers';
          this.teachers = success.users;
        }
      },
      (error) => {
        console.log(error);
        this.noTeachers = 'An error occured';
      }
    );
  }
  showCV(cv: any) {
    window.open(cv, '_blank');
  }
}
