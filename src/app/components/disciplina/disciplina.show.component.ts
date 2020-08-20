import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-disciplina-show',
  templateUrl: './disciplina.show.component.html',
  styleUrls: ['./disciplina.show.component.css']
})
export class DisciplinaShowComponent {
  disci:any; 
  public loading: boolean;
  constructor(private disciplinaService : DisciplinaService, 
    private activatedRoute : ActivatedRoute) { 
      var id : number = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.disci = {
        'nombre': 'Desconocido',
        'participantes': 0,
        'olimpiada_id': 0,
        'id': 0

        
      }
      
      
      this.disciplinaService.show(id)
        .subscribe((res) => {
          this.loading = false;
          this.disci.id = res["object"]["disciplina"]["id"];
          this.disci.nombre = res["object"]["disciplina"]["nombre"];
          this.disci.participantes = res["object"]["disciplina"]["participantes"];
          this.disci.olimpiada_id = res["object"]["olimpiada"]["id"];
          this.disci.olimpiada_nombre = res["object"]["olimpiada"]["nombre"];

        }, (err)=> {

      });
      this.loading = true;
      
    }
   
}
