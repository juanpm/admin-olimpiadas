import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { SeccionService } from '../../services/seccion/seccion.service';
import { FormBuilder } from '@angular/forms';

@Component({
  'selector': 'app-seccion',
  'templateUrl': './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})

export class SeccionComponent {
  seccion:any =[];
  pageActual: number = 1;
  public loading: boolean;
  newSeccionForm;
  crud_operation = {is_new: false, is_visible: false}

  constructor(
    private formBuilder:FormBuilder,
    private router: Router, 
    private seccionService:SeccionService){
    
      this.newSeccionForm = this.formBuilder.group({
        'nombrey': ''
        });
        this.load();
        this.loading = true;
      this.seccionService.index().subscribe((res) =>{
      this.seccion = res['objects'];
      
      
      }, (err)=>{

      });
      
  }

  load() {
    this.seccionService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
      this.loading = false;
      this.seccion = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  

  crearSeccion() {
    this.seccionService
      .post(this.newSeccionForm.value.nombrey)
      
      
      .subscribe((res)=>{
        if ( res['status'] ) {
          /*alert(">" + res["object"]["nombre"]);
          alert(">" + res["object"]["descripcion"]);
          alert(">" + res["object"]["fecha_inicio"]);
          alert(">" + res["object"]["fecha_fin"]);*/
          this.list();
        }
      }, (err) => {

      })

    //console.log();
  } 
   new() {
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }
}

