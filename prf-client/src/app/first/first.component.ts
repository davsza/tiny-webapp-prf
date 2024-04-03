import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {

  constructor(private connectionService: ConnectionService, private router: Router){
  }

  goToSecond(){
    this.router.navigate(['/second', 'PRF']);
  }
}
