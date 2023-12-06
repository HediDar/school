import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateStudentsComponent } from './evaluate-students.component';

describe('EvaluateStudentsComponent', () => {
  let component: EvaluateStudentsComponent;
  let fixture: ComponentFixture<EvaluateStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
