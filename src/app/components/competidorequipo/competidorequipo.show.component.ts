import { Component, OnInit } from '@angular/core';
import { CompetidorequipoService } from '../../services/competidorequipo/competidorequipo.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-competidorequipo-show',
  templateUrl: './competidorequipo.show.component.html',
  styleUrls: ['./competidorequipo.show.component.css']
})
export class CompetidorequipoShowComponent {
  compe:any; 
  public loading: boolean;
  constructor(private competidorequipoService : CompetidorequipoService, 
    private activatedRoute : ActivatedRoute) { 
      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.compe = {
        'matricula_id': 'Desconocido',
        'equipo_id': 0,
        'id': 0
      }

      this.competidorequipoService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.compe.id = res["object"]["competidorequipo"]["id"];
          this.compe.matricula_id = res["object"]["matricula"]["id"];
          this.compe.persona_nombrecompleto = res["object"]["persona"]["nombrecompleto"];
          this.compe.equipo_id = res["object"]["equipo"]["id"];
          this.compe.equipo_nombre = res["object"]["equipo"]["nombre"];

        }, (err)=> {

      })
      this.loading = true;
    }
}
