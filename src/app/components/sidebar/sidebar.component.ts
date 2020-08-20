import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  generals : any = {
    'user': {
      'email': 'Desconocido@gmail.com',
      'authenticated': false
    }
  };
  constructor(public authService : AuthService) { 
    
  }

  logout() {

    this.authService.logout()
      .subscribe((res)=>{

//        this.router.navigate(["/admin/olimpiada"]);

      });
    window.localStorage.clear();
    window.location.reload();      
  }
  ngOnInit() {
    this.generals.user.email = this.authService.currentEmail;
    this.generals.user.nombres = this.authService.currentNombres;
    if ( this.generals.user.email === undefined ) {
      this.generals.user.authenticated = false;
    } else {
      this.generals.user.authenticated = true;
    }
  }  
}
