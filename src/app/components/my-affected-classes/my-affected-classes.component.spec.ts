import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAffectedClassesComponent } from './my-affected-classes.component';

describe('MyAffectedClassesComponent', () => {
  let component: MyAffectedClassesComponent;
  let fixture: ComponentFixture<MyAffectedClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAffectedClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAffectedClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
