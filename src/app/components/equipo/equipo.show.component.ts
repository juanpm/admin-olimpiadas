import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../services/equipo/equipo.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-equipo-show',
  templateUrl: './equipo.show.component.html',
  styleUrls: ['./equipo.show.component.css']
})
export class EquipoShowComponent {
  equi:any; 
  public loading: boolean;
  constructor(private equipoService : EquipoService, 
    private activatedRoute : ActivatedRoute) { 
      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.equi = {
        'nombre': 'Desconocido',
        'disciplina_id': 0,
        'descripcion': '',
        'logo': '',
        'id': 0

        
      }
      
      
      this.equipoService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.equi.id = res["object"]["equipo"]["id"];
          this.equi.nombre = res["object"]["nombre"];
          this.equi.disciplina_id = res["object"]["disciplina"]["id"];
          this.equi.disciplina_nombre = res["object"]["disciplina"]["nombre"];
          this.equi.descripcion = res["object"]["descripcion"];
          this.equi.image = res["object"]["image"];

        }, (err)=> {

      });

      this.loading = true;
    }
   
}
