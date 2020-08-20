import { Component, VERSION, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  initialFase:number = 3;
  initialX:number = 0;
  initialY:number = 0;
  title = 'fixtura';
  generals : any = {
    'user': {
      'email': 'Desconocido@gmail.com',
      'authenticated': false
    }
  };

  constructor(public authService : AuthService, private spinnerService: NgxSpinnerService) {

  }

  public hideElement = false;
  ngOnInit() {
    this.spinner();
    this.generals.user.email = this.authService.currentEmail;
    if ( this.generals.user.email === undefined ) {
      this.generals.user.authenticated = false;
    } else {
      this.generals.user.authenticated = true;
    }
  }

  spinner(): void{
    this.spinnerService.show();
    setTimeout(() =>{
      this.spinnerService.hide();
    }, 2000);
  }

/*   iniciarSesion($event) {
    this.authService.login("admin@admin.com", "123456");
  } */
}
