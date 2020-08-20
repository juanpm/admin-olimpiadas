import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  api = environment.base_api;// En aqui se pone la direccion de la ruta del servidor 

  constructor(private http: HttpClient) {

  }
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  index() {
    return this.http.get(this.api + "api/auth/carreras", {});
  }
  show(id:number) {
    return this.http.get(this.api + "api/auth/carreras/"+ id, {});
  }
   post(nombrey:string) {//Este es el metodo post en angular que conecta con store de laravel
    return this.http.post(this.api + "api/auth/carreras", 
      this.getFormUrlEncoded({
        'nombre': nombrey
      }), {'headers': this.headers});
  }
    put(id:number, data:any) { //Este es el metodo put que conecta con el update de laravel
    return this.http.put(this.api + "api/auth/carreras/" + id,
      this.getFormUrlEncoded(data),
      {
        'headers': this.headers
      }
    );
  }
   delete(id:number) {//Este es el metodo delete que conecta el metodo destroy de laravel
    return this.http.delete(this.api + "api/auth/carreras/" + id);
  }
} 
