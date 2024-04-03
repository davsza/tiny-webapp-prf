import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermekserviceService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get('http://localhost:3000/users/termek');
  }

  insertitem(name: String, description: String) {
    return this.http.post('http://localhost:3000/users/termek', {name: name, description: description}, {responseType: 'text'});
  }
}
