import {Component} from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  'selector': 'app-usuario',
  'templateUrl': './usuario.component.html',
  'styleUrls': ['./usuario.component.css']
})

export class UsuarioComponent {
  lista:any;
  public loading: boolean;
  newUsuarioForm;
  crud_operation = {is_new: false, is_visible: false}

  constructor(private formBuilder:FormBuilder,
    private usuarioService : UsuarioService) {
    this.newUsuarioForm = this.formBuilder.group({
      'nombrez': '',
      'email': '',
      'password': ''
      });

    this.load();
    this.loading = true;
    this.usuarioService.index()
      .subscribe((res) => {
        // Aqui el codigo cuando la peticion sea ok.

        this.lista = res["objects"];
      }, (err)=>{
        // Aqui el codigo cuando la peticion sea fallida.

      });
  }

  load() {//Esta funcion sirve para refrescar las lista al momento de insertar
    this.usuarioService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
      this.loading = false;
      this.lista = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  


  crearUsuario() {//En aqui se crea el metodo post en angular 
    this.usuarioService
      .post(this.newUsuarioForm.value.nombrez,
        this.newUsuarioForm.value.email,
        this.newUsuarioForm.value.password)
      
      
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

  new() {
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  list() {//Esta parte llama a la funcion load y oculta el formulario de registro
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }
}