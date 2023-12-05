import { ClassesService } from './../../services/classes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css'],
})
export class ManageClassesComponent implements OnInit {
  classes: any = [];
  constructor(private classService: ClassesService, private router: Router) {}

  ngOnInit(): void {
    this.getAllClasses();
  }
  deleteClass(id: string) {
    this.classService.deleteClassById(id).subscribe(
      (success) => {
        console.log(success);
        if (success.message == 'deleted succesfully') {
          alert('Class deleted succesfully!');
          this.getAllClasses();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateClass(id: string) {
    this.router.navigate(['editclass/' + id]);
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      (success) => {
        console.log(success);
        this.classes = success.classes;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
