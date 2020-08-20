import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesafioService } from '../../services/desafio/desafio.service';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { EquipoService } from '../../services/equipo/equipo.service';
import { FormBuilder } from '@angular/forms';

@Component({
  'selector': 'app-desafio',
  'templateUrl': './desafio.component.html',
  'styleUrls': ['./desafio.component.css']
})

export class DesafioComponent implements OnInit {
  desafio:any =[];
  pageActual: number = 1;
  public loading: boolean;
  disciplinas:any =[];
  equipos:any =[];
  equiposr:any =[];
  newDesafioForm;
  crud_operation = {is_new: false, is_visible: false}
  disciplinaObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObjectr:any = {
    'selected': false,
    'text': '',
  };

  constructor(
    private formBuilder:FormBuilder,
    private router: Router, 
    private desafioService:DesafioService,
    private disciplinaService:DisciplinaService,
    private equipoService:EquipoService) {
      
      this.newDesafioForm = this.formBuilder.group({
        'disciplina_id': '',
        'invitado_id' : '',
        'retador_id' : '',
        'invitado_puntaje' : '',
        'retador_puntaje' : '',
        'fecha' : '',
        'fase' : '',
        'parent_id': '',
        'estado': ''

        });
      
        this.load();
        this.loading = true;
  }

  ngOnInit(): void {
    
  }
  // Foranea de disciplina - inicio
  unselectDisciplina() {
    this.disciplinaObject.selected = false;
    this.disciplinaObject.text = "";
    this.newDesafioForm.patchValue({
      "disciplina_id": undefined
    });    
  }
  selectDisciplina(o:any) {
    this.disciplinaObject.selected = true;
    this.disciplinaObject.text = o.nombre;
    this.newDesafioForm.patchValue({
      "disciplina_id": o.id
    });
    this.loadEquipo(o.id);
    this.loadEquipor(o.id);    
    
  }
  loadDisciplina() {
    this.disciplinaService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.disciplinas = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin

// Foranea de Equipo - inicio
unselectEquipo() {
  this.equipoObject.selected = false;
  this.equipoObject.text = "";
  this.newDesafioForm.patchValue({
    "invitado_id": undefined
  });    
}
selectEquipo(o:any) {
  this.equipoObject.selected = true;
  this.equipoObject.text = o.nombre;
  this.newDesafioForm.patchValue({
    "invitado_id": o.id
  });
}
loadEquipo(id:number) {
  this.equipoService.indexByDisciplina(id)
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.

    this.equipos = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  
// Fin

// Foranea de Equipo - inicio
unselectEquipor() {
  this.equipoObjectr.selected = false;
  this.equipoObjectr.text = "";
  this.newDesafioForm.patchValue({
    "retador_id": undefined
  });    
}
selectEquipor(o:any) {
  this.equipoObjectr.selected = true;
  this.equipoObjectr.text = o.nombre;
  this.newDesafioForm.patchValue({
    "retador_id": o.id
  });
}
loadEquipor(id:number) {
  this.equipoService.indexByDisciplina(id)
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.

    this.equiposr = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  
// Fin


load() {
  this.desafioService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.
    this.loading = false;
    this.desafio = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  

   crearDesafio() {
    this.desafioService
      .post(this.newDesafioForm.value.disciplina_id,
        this.newDesafioForm.value.invitado_id,
        this.newDesafioForm.value.retador_id,
        this.newDesafioForm.value.invitado_puntaje,
        this.newDesafioForm.value.retador_puntaje,
        this.newDesafioForm.value.fecha,
        this.newDesafioForm.value.fase)
      
      
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Registro exitoso");
          this.list();
          /*alert(">" + res["object"]["nombre"]);
          alert(">" + res["object"]["descripcion"]);
          alert(">" + res["object"]["fecha_inicio"]);
          alert(">" + res["object"]["fecha_fin"]);*/
        }
      }, (err) => {
          alert("Error en el registro")
      })

    //console.log();
  } 
  new() {
    this.loadDisciplina();

    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }
}

