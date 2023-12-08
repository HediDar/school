import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  classUrl: string = 'http://localhost:3000/classes'; //adresse a laquelle on va envoyer
  constructor(private httpClient: HttpClient) {}

  getClassById(id: any) {
    return this.httpClient.get<{ class: any }>(`${this.classUrl}/${id}`);
  }

  getClassesByIdStudent(idStudent: any) {
    return this.httpClient.get<{ classes: any; message: string }>(
      `${this.classUrl}/studentClasses/${idStudent}`
    );
  }

  getClassesByIdTeacher(id: any) {
    return this.httpClient.get<{ classes: any }>(
      `${this.classUrl}/teacher/${id}`
    );
  }

  deleteClassById(id: string) {
    return this.httpClient.delete<{ message: string }>(
      `${this.classUrl}/${id}`
    );
  }

  getAllClasses() {
    return this.httpClient.get<{ classes: any }>(`${this.classUrl}`);
  }

  addClass(obj: any) {
    return this.httpClient.post<{ message: string }>(this.classUrl, obj);
  }

  updateClass(obj: any) {
    return this.httpClient.put<{ message: string }>(this.classUrl, obj);
  }
}
