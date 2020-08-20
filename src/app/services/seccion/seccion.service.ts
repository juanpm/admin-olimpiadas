import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

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
    return this.http.get(this.api + "api/auth/seccionperiodos", {});
  }
  show(id:number) {
    return this.http.get(this.api + "api/auth/seccionperiodos/"+ id, {});
  }
   post(nombrey:string) {
    return this.http.post(this.api + "api/auth/seccionperiodos", 
      this.getFormUrlEncoded({
        'nombre': nombrey
      }), {'headers': this.headers});
  }
    put(id:number, data:any) {
    return this.http.put(this.api + "api/auth/seccionperiodos/" + id,
      this.getFormUrlEncoded(data),
      {
        'headers': this.headers
      }
    );
  }
   delete(id:number) {
    return this.http.delete(this.api + "api/auth/seccionperiodos/" + id);
  }
} 
