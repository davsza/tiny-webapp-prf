import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TermekserviceService } from '../utils/termekservice.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent {

  message = '';
  termekek: any = [];
  name: String;
  description: String;

  constructor(private termekService: TermekserviceService, private route: ActivatedRoute, private router: Router){
    this.name = '';
    this.description = '';
  }

  ngOnInit(): void{
    /*
    console.log('oninit');
    this.route.paramMap.subscribe(params => {
      console.log(params.get('message'));
      console.log(params.keys);
      this.message = params.get('id') + " " + params.get('message');
    }, error => {
      console.log('parammap error', error);
    });
    */

    this.termekService.list().subscribe(termekekReq => {
      this.termekek = Object.values(termekekReq);
      console.log(this.termekek);
    });
  }

  insertitem() {
    if (this.name != '' && this.description != '') {
      this.termekService.insertitem(this.name, this.description).subscribe(msg => {
      }, error => {
        console.log(error);
      });
    }
    this.router.navigate(['/second']);
  }

  isAdmin(){
    if (localStorage.getItem('user') === "admin") {
      return true;
    } else {
      return false;
    }
  }

}
