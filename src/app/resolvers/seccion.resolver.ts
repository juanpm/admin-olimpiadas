import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { SeccionService } from '../services/seccion/seccion.service';
import { mergeMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class SeccionResolver implements Resolve<any> {
  constructor(private router : Router, 
    private seccionService : SeccionService){
  }
  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) : Observable<any> {
      let id = parseInt(route.paramMap.get("id"));

      return this.seccionService
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