import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(username: String, password: String, email: String) {
    return this.http.post('http://localhost:3000/users/register', {username: username, password: password, email: email}, {responseType: 'text'});
  }
}
