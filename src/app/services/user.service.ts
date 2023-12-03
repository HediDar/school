import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = 'http://localhost:3000/users'; //adresse a laquelle on va envoyer
  constructor(private httpClient: HttpClient) {}

  login(obj: any) {
    // can make token string or any because user is sended as a string token
    return this.httpClient.post<{ message: string; token: any }>(
      `${this.userUrl}/login`,
      obj
    );
  }
  // edit profile
  editProfile(obj: any) {
    // can make token string or any because user is sended as a string token
    return this.httpClient.put<{ message: string }>(
      `${this.userUrl}/editProfile`,
      obj
    );
  }



  getUserById(id: any) {
    return this.httpClient.get<{ user: any }>(`${this.userUrl}/${id}`);
  }


  signUp(obj: any, file: File) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('firstName', obj.firstName);
    formData.append('lastName', obj.lastName);
    formData.append('email', obj.email);
    formData.append('password', obj.password);
    formData.append('adresse', obj.adresse);
    formData.append('telephone', obj.telephone);
    formData.append('role', obj.role);
    if (obj.role == 'teacher') formData.append('speciality', obj.speciality);

    console.log(formData);

    return this.httpClient.post<{ message: string }>(
      `${this.userUrl}/signup`,
      formData
    );
  }
}
