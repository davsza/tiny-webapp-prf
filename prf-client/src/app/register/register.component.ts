import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../utils/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username: string;
  password: string;
  email: string;

  constructor(private registerService: RegisterService, private router: Router) {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  register(){
    if (this.username != '' && this.password != '' && this.email != '') {
      this.registerService.register(this.username, this.password, this.email).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('user', this.username);
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
      });
    }
  }
}
