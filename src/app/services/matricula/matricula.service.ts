import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
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
    return this.http.get(this.api + "api/auth/matriculas", {});
  }
  show(id:number) {
    return this.http.get(this.api + "api/auth/matriculas/" + id, {});
  }
  post(carrera_id:number, seccionperiodo_id:number, persona_id:number) {
    return this.http.post(this.api + "api/auth/matriculas", 
      this.getFormUrlEncoded({
        'carrera_id': carrera_id,
        'persona_id': persona_id,
        'seccionperiodo_id': seccionperiodo_id
      }), {'headers': this.headers});
  }
  postx(carrera_id:number, seccionperiodo_id:number, persona_id:number) {
    return this.http.post(this.api + "api/auth/matriculas", 
      this.getFormUrlEncoded({
        'carrera_id': carrera_id,
        'persona_id': persona_id,
        'seccionperiodo_id': seccionperiodo_id
      }), {'headers': this.headers});
  }
  put(id:number, data:any) {
    return this.http.put(this.api + "api/auth/matriculas/" + id, 
      this.getFormUrlEncoded(data),
      {
        'headers': this.headers
      }
    );
  }
  delete(id: number) {
    return this.http.delete(this.api + "api/auth/matriculas/" + id);
  }
}
