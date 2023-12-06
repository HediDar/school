import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddOrEditCourseComponent } from './components/add-or-edit-course/add-or-edit-course.component';
import { AdminComponent } from './components/admin/admin.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { AuthGuard } from './services/auth.guard';
import { TeacherOrAdminGuard } from './services/teacher-or-admin.guard';
import { ConnectedGuard } from './services/connected.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddOrEditClassComponent } from './components/add-or-edit-class/add-or-edit-class.component';
import { ManageClassesComponent } from './components/manage-classes/manage-classes.component';
import { MyAffectedClassesComponent } from './components/my-affected-classes/my-affected-classes.component';
import { EvaluateStudentsComponent } from './components/evaluate-students/evaluate-students.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signupStudent', component: SignupComponent },
  { path: 'signupTeacher', component: SignupComponent },
  { path: 'signupParent', component: SignupComponent },
  { path: 'signupAdmin', component: SignupComponent },
  {
    path: 'manageClasses',
    component: ManageClassesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addClass',
    component: AddOrEditClassComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'editClass/:id',
    component: AddOrEditClassComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addCourse',
    component: AddOrEditCourseComponent,
    canActivate: [TeacherOrAdminGuard],
  },

  {
    path: 'evaluateStudents/:id',
    component: EvaluateStudentsComponent,
    canActivate: [TeacherOrAdminGuard],
  },

  {
    path: 'myClasses',
    component: MyAffectedClassesComponent,
    canActivate: [TeacherOrAdminGuard],
  },

  {
    path: 'editCourse/:id',
    component: AddOrEditCourseComponent,
    canActivate: [TeacherOrAdminGuard],
  },
  {
    path: 'myCourses',
    component: CoursesTabComponent,
    canActivate: [TeacherOrAdminGuard],
  },

  {
    path: 'allCourses',
    component: CoursesTabComponent,
    canActivate: [TeacherOrAdminGuard],
  },

  {
    path: 'allCourses',
    component: CoursesTabComponent,
    canActivate: [TeacherOrAdminGuard],
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ConnectedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
