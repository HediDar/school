import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-in-home',
  templateUrl: './courses-in-home.component.html',
  styleUrls: ['./courses-in-home.component.css'],
})
export class CoursesInHomeComponent implements OnInit {
  @Input() course: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewCourseDetails() {
    this.router.navigate([`viewCourse/${this.course._id}`]);
  }
}
