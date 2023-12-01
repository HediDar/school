import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInHomeComponent } from './courses-in-home.component';

describe('CoursesInHomeComponent', () => {
  let component: CoursesInHomeComponent;
  let fixture: ComponentFixture<CoursesInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesInHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
