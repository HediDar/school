import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCourseComponent } from './add-or-edit-course.component';

describe('AddOrEditCourseComponent', () => {
  let component: AddOrEditCourseComponent;
  let fixture: ComponentFixture<AddOrEditCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
