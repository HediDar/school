import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseUrl: string = 'http://localhost:3000/courses'; //adresse a laquelle on va envoyer
  constructor(private httpClient: HttpClient) {}

  getCourseById(id: any) {
    return this.httpClient.get<{ course: any }>(`${this.courseUrl}/${id}`);
  }

  getCoursesByIdTeacher(id: any) {
    return this.httpClient.get<{ teacherCourses: any; message: string }>(
      `${this.courseUrl}/myCourses/${id}`
    );
  }

  deleteCourseById(id: string) {
    return this.httpClient.delete<{ message: string }>(
      `${this.courseUrl}/${id}`
    );
  }

  getAllCourses() {
    return this.httpClient.get<{ courses: any }>(`${this.courseUrl}`);
  }

  addCourse(obj: any, file: File) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', obj.name);
    formData.append('description', obj.description);
    formData.append('duration', obj.duration);
    formData.append('teacherId', obj.teacherId);

    return this.httpClient.post<{ message: string }>(
      `${this.courseUrl}`,
      formData
    );
  }

  editCourse(obj: any, file: File) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', obj.name);
    formData.append('id', obj.id);
    formData.append('description', obj.description);
    formData.append('duration', obj.duration);

    return this.httpClient.put<{ message: string }>(
      `${this.courseUrl}`,
      formData
    );
  }
}
