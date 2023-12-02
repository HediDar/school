import { TestBed } from '@angular/core/testing';

import { TeacherOrAdminGuard } from './teacher-or-admin.guard';

describe('TeacherOrAdminGuard', () => {
  let guard: TeacherOrAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TeacherOrAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
