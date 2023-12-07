import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers-in-home',
  templateUrl: './teachers-in-home.component.html',
  styleUrls: ['./teachers-in-home.component.css'],
})
export class TeachersInHomeComponent implements OnInit {
  @Input() teacher: any;
  constructor() {}

  ngOnInit(): void {}
}
