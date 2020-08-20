import { Component } from '@angular/core';
import { PersonaService } from '../../services/persona/persona.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-persona-show',
  templateUrl: './persona.show.component.html',
  styleUrls: ['./persona.show.component.css']
})

export class PersonaShowComponent{
  per:any; 
  public loading: boolean;
  constructor(private personaService : PersonaService, 
      private activatedRoute : ActivatedRoute){

      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.per = {
        'nombre': 'Desconocido',
        'id': 0,
        'fecha_nacimiento':'',
        'telefono':''
      }

      this.personaService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.per.nombrecompleto = res["object"]["nombrecompleto"];
          this.per.id = res["object"]["id"];
          this.per.codigo = res["object"]["codigo"];
          this.per.dni = res["object"]["dni"];
          this.per.fecha_nacimiento = res["object"]["fecha_nacimiento"];
          this.per.telefono = res["object"]["telefono"];
          this.per.foto = res["object"]["foto"];

        }, (err)=> {

      })
      this.loading = true;
  }
}