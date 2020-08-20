import {Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  'selector': 'app-usuario-login',
  'templateUrl': './usuario.login.component.html',
  'styleUrls': ['./usuario.login.component.css']
})

export class UsuarioLoginComponent {
  lista:any;
  formLogin;
  constructor(private usuarioService : UsuarioService,
    private authService : AuthService,
    private formBuilder : FormBuilder, 
    private router : Router) {
        this.formLogin = this.formBuilder.group({
            'usuario': '',
            'password': ''
          })
  }

  login() {

    let email = this.formLogin.value["usuario"]
    let password = this.formLogin.value["password"];
    
    this.authService.login(email, password)
      .subscribe((response: any) => {
        console.log(">", response);

        localStorage.setItem("access_token", 
          response.access_token);

        localStorage.setItem('token_type', 
          response.token_type);

        localStorage.setItem("email", response.email);
        localStorage.setItem("nombres", response.nombres);

        var tiempo = new Date(Date.now() + (response.expires_in * 1000));

        localStorage.setItem("expires_in", 
          tiempo.toString());
          window.location.reload();
        //this.router.navigate(["/admin/olimpiada"]);

      }, (error: any) => {
        alert("No se pudo Iniciar Sesion");
      });
  }
}