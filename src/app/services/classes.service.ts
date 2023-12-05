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
}
