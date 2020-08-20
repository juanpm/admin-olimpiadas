import { Component, OnInit } from '@angular/core';
import { OlimpiadaService } from '../../services/olimpiada/olimpiada.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-olimpiada-show',
  templateUrl: './olimpiada.show.component.html',
  styleUrls: ['./olimpiada.show.component.css']
})
export class OlimpiadaShowComponent {
  olim:any; 
  public loading: boolean;
  constructor(private olimpiadaService : OlimpiadaService, 
    private activatedRoute : ActivatedRoute) { 
      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.olim = {
        'nombre': 'Desconocido',
        'id': 0
      }

      this.olimpiadaService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.olim.nombre = res["object"]["nombre"];
          this.olim.descripcion = res["object"]["descripcion"];
          this.olim.fecha_inicio = res["object"]["fecha_inicio"];
          this.olim.fecha_fin_inscripcion = res["object"]["fecha_fin_inscripcion"];
          this.olim.fecha_fin = res["object"]["fecha_inicio"];
          this.olim.id = res["object"]["id"];

        }, (err)=> {

      })
      this.loading = true;
    }
}
