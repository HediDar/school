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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
