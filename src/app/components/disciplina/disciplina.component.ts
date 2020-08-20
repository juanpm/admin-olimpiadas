import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { OlimpiadaService } from '../../services/olimpiada/olimpiada.service';
import { FormBuilder } from '@angular/forms';

@Component({
  'selector': 'app-disciplina',
  'templateUrl': './disciplina.component.html',
  'styleUrls': ['./disciplina.component.css']
})

export class DisciplinaComponent implements OnInit {
  disciplina:any =[];
  public loading: boolean;
  olimpiadas:any =[];
  newDisciplinaForm;
  crud_operation = {is_new: false, is_visible: false}
  olimpiadaObject:any = {
    'selected': false,
    'text': '',
  };

  constructor(
    private formBuilder:FormBuilder,
    private router: Router, 
    private disciplinaService:DisciplinaService,
    private olimpiadaService:OlimpiadaService) {
    
      this.newDisciplinaForm = this.formBuilder.group({
        'nombre': '',
        'participantes' : '',
        'olimpiada_id' : ''

        });
      
        this.load();
        this.loading = true;
  }

  ngOnInit(): void {
  }
  // Foranea de disciplina - inicio
  unselectOlimpiada() {
    this.olimpiadaObject.selected = false;
    this.olimpiadaObject.text = "";
    this.newDisciplinaForm.patchValue({
      "olimpiada_id": undefined
    });    
  }
  selectOlimpiada(o:any) {
    this.olimpiadaObject.selected = true;
    this.olimpiadaObject.text = o.nombre;
    this.newDisciplinaForm.patchValue({
      "olimpiada_id": o.id
    });
  }
  loadOlimpiada() {
    this.olimpiadaService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.olimpiadas = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin


load() {
  this.disciplinaService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.
    this.loading = false;
    this.disciplina = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  

   crearDisciplina() {
    this.disciplinaService
      .post(this.newDisciplinaForm.value.nombre,
        this.newDisciplinaForm.value.participantes,
        this.newDisciplinaForm.value.olimpiada_id)
      
      
      .subscribe((res)=>{
        if ( res['status'] ) {
          this.list();
          /*alert(">" + res["object"]["nombre"]);
          alert(">" + res["object"]["descripcion"]);
          alert(">" + res["object"]["fecha_inicio"]);
          alert(">" + res["object"]["fecha_fin"]);*/
        }
      }, (err) => {

      })

    //console.log();
  } 
  new() {
    this.loadOlimpiada();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }
}

