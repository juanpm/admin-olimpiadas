import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OlimpiadaService {
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
    return this.http.get(this.api + "api/auth/olimpiadas", {});
  }
  show(id:number) {
    return this.http.get(this.api + "api/auth/olimpiadas/" + id, {});
  }
  post(nombre:string, descripcion:string, fecha_inicio:Date, fecha_fin_inscripcion:Date, fecha_fin:Date) {
    return this.http.post(this.api + "api/auth/olimpiadas", 
      this.getFormUrlEncoded({
        'nombre': nombre,
        'descripcion': descripcion,
        'fecha_inicio': fecha_inicio,
        'fecha_fin_inscripcion': fecha_fin_inscripcion,
        'fecha_fin': fecha_fin
      }), {'headers': this.headers});
  }
  put(id:number, data:any) {
    return this.http.put(this.api + "api/auth/olimpiadas/" + id, 
      this.getFormUrlEncoded(data),
      {
        'headers': this.headers
      }
    );
  }
  delete(id: number) {
    return this.http.delete(this.api + "api/auth/olimpiadas/" + id);
  }
}
