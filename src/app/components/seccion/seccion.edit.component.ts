import {Component} from '@angular/core';
import {SeccionService } from '../../services/seccion/seccion.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';


@Component({
  'selector': 'app-seccion-edit',
  'templateUrl': './seccion.edit.component.html',
  styleUrls: ['./seccion.edit.component.css']
})

export class SeccionEditComponent {
  formEdit;
  id : number;
  status='nothing';

  constructor(private seccionService : SeccionService,
      private activatedRoute : ActivatedRoute,
      private formBuilder : FormBuilder,
      private router : Router){

      //Creo instancia
      this.formEdit = this.formBuilder.group({
        'id': 0,
        'nombre' : ''
      });
      
      this.id = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.seccionService.show(this.id)
        .subscribe((res)=>{

          //1 Sobre escribo
        this.formEdit.setValue({
          'id': res["object"]["id"],
          'nombre': res["object"]["nombre"]
        });

      }, (err)=>{
        
        //2

      });
    }
   onSubmit() {
    this.seccionService.put(this.id, 
      {
        'nombre': this.formEdit.value.nombre
      }).subscribe((res) => {
        alert("Datos Actualizados");
        this.router.navigate(["admin/seccion"]);
      }, (err)=>{
        alert("Sigue intentando");
      });
  }
  
  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.seccionService.delete(this.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/seccion"]);
      }, (err)=>{
        this.status = "error";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);  

        alert("Sigue intentando");
      });
  }
}