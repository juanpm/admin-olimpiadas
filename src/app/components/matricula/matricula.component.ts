import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula/matricula.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CarreraService } from '../../services/carrera/carrera.service';
import { SeccionService } from '../../services/seccion/seccion.service';
import { PersonaService } from '../../services/persona/persona.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})


export class MatriculaComponent implements OnInit {
  lista:any=[];
  pageActual: number = 1;
  public loading: boolean;
  carreras:any=[];
  secciones:any=[];
  personas:any=[];
  newMatriculaForm;
  crud_operation = {is_new: false, is_visible: false}
  carreraObject:any = {
    'selected': false,
    'text': '',
  };
  seccionObject:any = {
    'selected': false,
    'text': '',
  };
  personaObject:any = {
    'selected': false,
    'text': '',
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private carreraService: CarreraService,
    private seccionService: SeccionService,
    private personaService: PersonaService,
    private matriculaService: MatriculaService) { 
      this.newMatriculaForm = this.formBuilder.group({
        'carrera_id': '',
        'persona_id': '',
        'seccionperiodo_id': ''
      });
  
      this.load();
      this.loading = true;
      

    }

  ngOnInit(): void {
  }
  // Foranea de carrera - inicio
  unselectCarrera() {
    this.carreraObject.selected = false;
    this.carreraObject.text = "";
    this.newMatriculaForm.patchValue({
      "carrera_id": undefined
    });    
  }
  selectCarrera(o:any) {
    this.carreraObject.selected = true;
    this.carreraObject.text = o.nombre;
    this.newMatriculaForm.patchValue({
      "carrera_id": o.id
    });
  }
  loadCarrera() {
    this.carreraService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.carreras = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin

// Foranea de seccion - inicio
unselectSeccion() {
  this.seccionObject.selected = false;
  this.seccionObject.text = "";
  this.newMatriculaForm.patchValue({
    "seccionperiodo_id": undefined
  });    
}
selectSeccion(o:any) {
  this.seccionObject.selected = true;
  this.seccionObject.text = o.nombre;
  this.newMatriculaForm.patchValue({
    "seccionperiodo_id": o.id
  });
}
loadSeccion() {
  this.seccionService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.
    this.secciones = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  
// Fin

// Foranea de persona - inicio
unselectPersona() {
  this.personaObject.selected = false;
  this.personaObject.text = "";
  this.newMatriculaForm.patchValue({
    "persona_id": undefined
  });    
}
selectPersona(o:any) {
  this.personaObject.selected = true;
  this.personaObject.text = o.nombrecompleto;
  this.newMatriculaForm.patchValue({
    "persona_id": o.id
  });
}
loadPersona() {
  this.personaService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.
    
    this.personas = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  
// Fin

  load() {
    this.matriculaService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
      this.loading = false;
      this.lista = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
  crearMatricula() {
    this.matriculaService
    .post(this.newMatriculaForm.value.carrera_id,this.newMatriculaForm.value.seccionperiodo_id,
      this.newMatriculaForm.value.persona_id)
      .subscribe((res)=>{
        if ( res['status'] ) {
          this.list();
        }
      }, (err) => {

    })
  }
  new() {
    this.loadCarrera();
    this.loadSeccion();
    this.loadPersona();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }

}
