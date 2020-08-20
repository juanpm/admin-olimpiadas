import { Component, OnInit } from '@angular/core';
import { CompetidorequipoService } from '../../services/competidorequipo/competidorequipo.service';
import { MatriculaService } from '../../services/matricula/matricula.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EquipoService } from '../../services/equipo/equipo.service';

@Component({
  selector: 'app-competidorequipo',
  templateUrl: './competidorequipo.component.html',
  styleUrls: ['./competidorequipo.component.css']
})


export class CompetidorequipoComponent implements OnInit {
  lista:any=[];
  pageActual: number = 1;
  public loading: boolean;
  matriculas:any=[];
  equipos:any=[];

  newCompetidorForm;
  crud_operation = {is_new: false, is_visible: false}
  matriculaObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObject:any = {
    'selected': false,
    'text': '',
  };

  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private competidorequipoService: CompetidorequipoService,
    private equipoService: EquipoService,
    private matriculaService: MatriculaService) { 
      this.newCompetidorForm = this.formBuilder.group({
        'matricula_id': '',
        'equipo_id': ''
      });
  
      this.load();
      this.loading = true;
      

    }

  ngOnInit(): void {
  }
  // Foranea de carrera - inicio
  unselectMatricula() {
    this.matriculaObject.selected = false;
    this.matriculaObject.text = "";
    this.newCompetidorForm.patchValue({
      "matricula_id": undefined
    });    
  }
  selectMatricula(o:any) {
    this.matriculaObject.selected = true;
    this.matriculaObject.text = o.persona.nombrecompleto;
    this.newCompetidorForm.patchValue({
      "matricula_id": o.id
    });
  }
  loadMatricula() {
    this.matriculaService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.matriculas = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin

// Foranea de seccion - inicio
unselectEquipo() {
  this.equipoObject.selected = false;
  this.equipoObject.text = "";
  this.newCompetidorForm.patchValue({
    "equipo_id": undefined
  });    
}
selectEquipo(o:any) {
  this.equipoObject.selected = true;
  this.equipoObject.text = o.nombre;
  this.newCompetidorForm.patchValue({
    "equipo_id": o.id
  });
}
loadEquipo() {
  this.equipoService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.

    this.equipos = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  
// Fin

  load() {
    this.competidorequipoService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
      this.loading = false;
      this.lista = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
  crearMatricula() {
    this.competidorequipoService
    .post(this.newCompetidorForm.value.matricula_id,this.newCompetidorForm.value.equipo_id)
      .subscribe((res)=>{
        if ( res['status'] ) {
          this.list();
        }
      }, (err) => {

    })
  }
  new() {
    this.loadMatricula();
    this.loadEquipo();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }

}