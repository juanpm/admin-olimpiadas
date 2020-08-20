import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { PersonaService } from '../services/persona/persona.service';
import { mergeMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class PersonaResolver implements Resolve<any> {
  constructor(private router : Router, 
    private personaService : PersonaService){
  }
  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) : Observable<any> {
      let id = parseInt(route.paramMap.get("id"));

      return this.personaService
        .show(id)
        .pipe(take(1), 
          mergeMap(crisis => {
            if ( crisis["status"] ) {
              return of(crisis["object"]);
            } else {
              this.router.navigate(["/"]);
            }
          }));
    }
}