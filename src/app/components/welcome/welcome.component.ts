import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  isHome: boolean = false;
  @Input() title:any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.url == '/' ? (this.isHome = true) : (this.isHome = false);
  }
}
