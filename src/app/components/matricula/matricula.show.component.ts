import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula/matricula.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-matricula-show',
  templateUrl: './matricula.show.component.html',
  styleUrls: ['./matricula.show.component.css']
})
export class MatriculaShowComponent {
  matri:any; 
  public loading: boolean;
  constructor(private matriculaService : MatriculaService, 
    private activatedRoute : ActivatedRoute) { 
      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.matri = {
        'persona_id': 'Desconocido',
        'carrera_id': 0,
        'seccionperiodo_id': 0,
        'id': 0
      }

      this.matriculaService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.matri.id = res["object"]["matricula"]["id"];
          this.matri.persona_id = res["object"]["persona"]["id"];
          this.matri.persona_nombre = res["object"]["persona"]["nombrecompleto"];
          this.matri.carrera_id = res["object"]["carrera"]["id"];
          this.matri.carrera_nombre = res["object"]["carrera"]["nombre"];
          this.matri.seccionperiodo_id = res["object"]["seccion"]["id"];
          this.matri.seccionperiodo_nombre = res["object"]["seccion"]["nombre"];

        }, (err)=> {

      })
      this.loading = true;
    }
}
