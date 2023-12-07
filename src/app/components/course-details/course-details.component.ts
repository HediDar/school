import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  dataMissing: boolean = true;
  course: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService
      .getCourseById(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (success) => {
          console.log(success);
          if (success.message == 'no course found') this.dataMissing = true;
          else {
            this.dataMissing = false;
            this.course = success.course;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
