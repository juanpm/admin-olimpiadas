import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from '../../services/equipo/equipo.service';
import { FormBuilder } from '@angular/forms';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';

@Component({
  'selector': 'app-equipo',
  'templateUrl': './equipo.component.html',
  'styleUrls': ['./equipo.component.css']
})

export class EquipoComponent {
  
  
  equipo:any =[];
  pageActual: number = 1;
  public loading: boolean;
  disciplinas:any=[];
  newEquipoForm;
  crud_operation = {is_new: false, is_visible: false}
  disciplinaObject:any = {
    'selected': false,
    'text': '',
  };
  
  constructor(
    private formBuilder:FormBuilder,
    private router: Router, 
    private equipoService:EquipoService,
    private disciplinaService:DisciplinaService) {
    
      this.newEquipoForm = this.formBuilder.group({
        'nombre': '',
        'disciplina_id' : '',
        'descripcion' : '',
        'image' : ''

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
    this.newEquipoForm.patchValue({
      "disciplina_id": undefined
    });    
  }
  selectDisciplina(o:any) {
    this.disciplinaObject.selected = true;
    this.disciplinaObject.text = o.nombre;
    this.newEquipoForm.patchValue({
      "disciplina_id": o.id
    });
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


load() {
  this.equipoService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.
    this.loading = false;
    this.equipo = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  


   crearEquipo() {
    this.equipoService
      .post(this.newEquipoForm.value.nombre,
        this.newEquipoForm.value.disciplina_id,
        this.newEquipoForm.value.descripcion,
        this.newEquipoForm.value.image )
      
      
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

