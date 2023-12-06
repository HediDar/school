import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  evaluationUrl: string = 'http://localhost:3000/evaluations'; //adresse a laquelle on va envoyer
  constructor(private httpClient: HttpClient) {}

  addOrEditEvaluation(obj: any) {
    return this.httpClient.post<{ message: string }>(this.evaluationUrl, obj);
  }

  getEvaluationByIdStudentAndClass(idStudent: any, idClass: any) {
    return this.httpClient.get<{ evaluation: any }>(
      `${this.evaluationUrl}/${idStudent}/${idClass}`
    );
  }
}
