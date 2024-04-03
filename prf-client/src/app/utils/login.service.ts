import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    return this.http.post('http://localhost:3000/users/login', {username: username, password: password}, {responseType: 'text'});
  }

  logout() {
    return this.http.post('http://localhost:3000/users/logout', {}, {withCredentials: true, responseType: 'text'});
  }
}
