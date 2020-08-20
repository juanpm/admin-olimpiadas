import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from '../../services/carrera/carrera.service';// importamos el servicio de carrera
import { FormBuilder } from '@angular/forms';

@Component({
  'selector': 'app-carrera',
  'templateUrl': './carrera.component.html',// enlazamos el archivo html de carrea
  'styleUrls': ['./carrera.component.css']// enlazamos el archivo css de carrera
})

export class CarreraComponent {
  
  public loading: boolean;
  carrera:any =[];//creamos variables
  newCarreraForm;
  crud_operation = {is_new: false, is_visible: false}// esto es para ocultar el formulario de registro
  
  constructor(//Esta parte de codigo es el contructor
    private formBuilder:FormBuilder,
    private router: Router, 
    private carreraService:CarreraService) {
    
      this.newCarreraForm = this.formBuilder.group({
        'nombreo': ''
        });
      this.load();//Esto llama al la funcion load
      this.loading = true;
      this.carreraService.index().subscribe((res) =>{
      this.carrera = res['objects'];
      
      
      }, (err)=>{

      });
      
  }
  
  load() {//Esta funcion sirve para refrescar las lista al momento de insertar
    this.carreraService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
      this.loading = false;
      this.carrera = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  

   crearCarrera() {//En aqui se crea el metodo post en angular 
    this.carreraService
      .post(this.newCarreraForm.value.nombreo)
      
      
      .subscribe((res)=>{
        if ( res['status'] ) {
          this.list();//Esta linea indica que si el registro es satisfactorio llamara al a funccion list
          /*alert(">" + res["object"]["nombre"]);
          alert(">" + res["object"]["descripcion"]);
          alert(">" + res["object"]["fecha_inicio"]);
          alert(">" + res["object"]["fecha_fin"]);*/
        }
      }, (err) => {

      })

    //console.log();
  } 
   new() { // Esto no ayuda en el tema de ocultar el formulario de registro
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {//Esta parte llama a la funcion load y oculta el formulario de registro
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }
}

