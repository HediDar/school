import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: any = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (success) => {
        this.users = success.users;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showCV() {
    alert('show');
  }
  acceptUser(id: string) {
    alert('accept');
  }
  delete(id: string) {
    this.userService.deleteUserById(id).subscribe(
      (success) => {
        console.log(success);
        if (success.message == 'deleted succesfully') {
          alert('User deleted succesfully!');
          this.getAllUsers();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
