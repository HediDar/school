import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ServicesComponent } from './components/services/services.component';
import { CoursesInHomeComponent } from './components/courses-in-home/courses-in-home.component';
import { TeachersInHomeComponent } from './components/teachers-in-home/teachers-in-home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { SafePipe } from './pipes/safe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AddOrEditCourseComponent } from './components/add-or-edit-course/add-or-edit-course.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { AdminCoursesComponent } from './components/admin-courses/admin-courses.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { TeacherOrAdminGuard } from './services/teacher-or-admin.guard';
import { ConnectedGuard } from './services/connected.guard';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddOrEditClassComponent } from './components/add-or-edit-class/add-or-edit-class.component';
import { ManageClassesComponent } from './components/manage-classes/manage-classes.component';
import { MyAffectedClassesComponent } from './components/my-affected-classes/my-affected-classes.component';
import { EvaluateStudentsComponent } from './components/evaluate-students/evaluate-students.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { StudentClassesComponent } from './components/student-classes/student-classes.component';
import { StudentGuard } from './services/student.guard';
import { StudentEvaluationComponent } from './components/student-evaluation/student-evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    ServicesComponent,
    CoursesInHomeComponent,
    TeachersInHomeComponent,
    FooterComponent,
    LoaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SafePipe,
    AddOrEditCourseComponent,
    CoursesTabComponent,
    AdminCoursesComponent,
    AdminComponent,
    ProfileComponent,
    ManageUsersComponent,
    AddOrEditClassComponent,
    ManageClassesComponent,
    MyAffectedClassesComponent,
    EvaluateStudentsComponent,
    CourseDetailsComponent,
    SearchTeacherComponent,
    StudentClassesComponent,
    StudentEvaluationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, TeacherOrAdminGuard, ConnectedGuard, StudentGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
