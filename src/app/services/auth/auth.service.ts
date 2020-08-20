import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient, 
  HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  api = environment.base_api;// En aqui se pone la direccion de la ruta del servidor 
  token = undefined;

  constructor(private http: HttpClient) {

  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
      'Conten-Type': 'application/x-www-form-urlencoded'
    });
  }

  public get logIn() : boolean {
    if ( localStorage.getItem("access_token") !== null ) {
      var punto = new Date(localStorage.getItem("expires_in"));
      var actual = new Date();
      if ( actual < punto ) {
        return true;
      }
      return false;
    }
    return false;
  }
  public get currentEmail() : string {
    if ( localStorage.getItem("email") !== null ) {
      return localStorage.getItem("email");
    }
    return undefined;
  }  

  public get currentNombres() : string {
    if ( localStorage.getItem("nombres") !== null ) {
      return localStorage.getItem("nombres");
    }
    return undefined;
  }  

  postMe() {
    return this.http.post(this.api + "api/auth/me", {

    }, {
      headers: this.getHeaders()
    });
  }

  logout() {
    return this.http.post(this.api + "api/auth/logout", {

    }, {
      headers: this.getHeaders()
    });
  }
  login(email: string, passsword: string) {
    return this.http.post(this.api + "api/auth/login", {
      email: email,
      password: passsword
    });
  }

}
