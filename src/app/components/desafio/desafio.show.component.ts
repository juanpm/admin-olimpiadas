import { Component, OnInit } from '@angular/core';
import { DesafioService } from '../../services/desafio/desafio.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-desafio-show',
  templateUrl: './desafio.show.component.html',
  styleUrls: ['./desafio.show.component.css']
})
export class DesafioShowComponent {
  desaf:any; 
  public loading: boolean;
  constructor(private desafioService : DesafioService, 
    private activatedRoute : ActivatedRoute) { 
      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.desaf = {
        'disciplina_id': 'Desconocido',
        'invitado_id' : 0,
        'retador_id' : 0,
        'invitado_puntaje' : 0,
        'retador_puntaje' : 0,
        'ganador' : '',
        'parent_id' : '',
        'fase' : ''

  
      }
      
      
      this.desafioService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.desaf.id = res["object"]["desafio"]["id"];
          this.desaf.disciplina_id = res["object"]["disciplina"]["id"];
          this.desaf.disciplina_nombre = res["object"]["disciplina"]["nombre"];
          this.desaf.invitado_id = res["object"]["invitado"]["id"];
          this.desaf.invitado_nombre = res["object"]["invitado"]["nombre"];
          this.desaf.invitado_image = res["object"]["invitado"]["image"];
          this.desaf.retador_id = res["object"]["retador"]["id"];
          this.desaf.retador_nombre = res["object"]["retador"]["nombre"];
          this.desaf.invitado_puntaje = res["object"]["desafio"]["invitado_puntaje"];
          this.desaf.retador_puntaje = res["object"]["desafio"]["retador_puntaje"];
          //this.desaf.ganador = res["object"]["ganador"];
          this.desaf.fecha = res["object"]["desafio"]["fecha"];
          //this.desaf.parent_id = res["object"]["parent_id"];
          this.desaf.fase = res["object"]["desafio"]["fase"];
        }, (err)=> {

      });

      this.loading = true;
    }
   
}
