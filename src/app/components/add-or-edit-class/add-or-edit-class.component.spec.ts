import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditClassComponent } from './add-or-edit-class.component';

describe('AddOrEditClassComponent', () => {
  let component: AddOrEditClassComponent;
  let fixture: ComponentFixture<AddOrEditClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
