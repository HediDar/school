import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersInHomeComponent } from './teachers-in-home.component';

describe('TeachersInHomeComponent', () => {
  let component: TeachersInHomeComponent;
  let fixture: ComponentFixture<TeachersInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersInHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
