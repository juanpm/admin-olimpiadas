import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  api = environment.base_api;

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
    return this.http.get(this.api + "api/auth/disciplinas", {});
  }
  show(id:number) {
    return this.http.get(this.api + "api/auth/disciplinas/" + id, {});
  }
  post(nombre:string, participantes:number, olimpiada_id:number) {
    return this.http.post(this.api + "api/auth/disciplinas", 
      this.getFormUrlEncoded({
        'nombre': nombre,
        'participantes': participantes,
        'olimpiada_id': olimpiada_id
      }), {'headers': this.headers});
  }
  put(id:number, data:any) {
    return this.http.put(this.api + "api/auth/disciplinas/" + id, 
      this.getFormUrlEncoded(data),
      {
        'headers': this.headers
      }
    );
  }
  delete(id: number) {
    return this.http.delete(this.api + "api/auth/disciplinas/" + id);
  }
}
