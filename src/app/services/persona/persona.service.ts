import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  api = environment.base_api;

  constructor(private http: HttpClient) { }
  
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
    return this.http.get(this.api + "api/auth/personas", {});
  }
  show(id:number) {
    return this.http.get(this.api + "api/auth/personas/" + id, {});
  }
  post(codigo:string, nombre:string, dni:string, fecha_nacimiento:Date, 
    telefono:string, foto:string, user_id:number) {
    return this.http.post(this.api + "api/auth/personas", 
      this.getFormUrlEncoded({
        'codigo': codigo,
        'nombrecompleto': nombre,
        'dni': dni,
        'fecha_nacimiento': fecha_nacimiento,
        'telefono': telefono,
        'foto': foto,
        'user_id': user_id
      }), {'headers': this.headers});
  }
  postx(codigo:string, nombre:string, dni:string, fecha_nacimiento:string, 
    telefono:string, foto:string) {
    return this.http.post(this.api + "api/auth/personas", 
      this.getFormUrlEncoded({
        'codigo': codigo,
        'nombrecompleto': nombre,
        'dni': dni,
        'fecha_nacimiento': fecha_nacimiento,
        'telefono': telefono,
        'foto': foto
      }), {'headers': this.headers});
  }
  put(id:number, data:any) {
    return this.http.put(this.api + "api/auth/personas/" + id, 
      this.getFormUrlEncoded(data),
      {
        'headers': this.headers
      }
    );
  }
  delete(id: number) {
    return this.http.delete(this.api + "api/auth/personas/" + id);
  }
}
