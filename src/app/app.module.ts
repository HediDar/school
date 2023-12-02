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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,TeacherOrAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
