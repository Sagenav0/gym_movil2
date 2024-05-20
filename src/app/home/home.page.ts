import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
cedula = this.userService.getCedula();
  constructor(private userService: UserService) {}

  ngOnInit() {
    
  }
}
