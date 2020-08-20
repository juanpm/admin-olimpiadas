import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona/persona.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  lista:any;
  pageActual: number = 1;
  public loading: boolean;
  newPersonaForm;
  usuarios:any =[];

  crud_operation = {is_new: false, is_visible: false};
  asignarusuario = {is_new: false, is_visible: false}
  usuarioObject:any = {
    'selected': false,
    'text': '',
  };

  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private personaService:PersonaService,
    private usuarioService:UsuarioService) {
      this.newPersonaForm = this.formBuilder.group({
        'codigo': '',
        'nombrecompleto': '',
        'dni': '',
        'fecha_nacimiento':'',
        'telefono': '',
        'foto': '',
        'user_id': ''
      })
      this.load();
      this.loading = true;
      this.personaService.index()
        .subscribe((res) => {
          // Aqui el codigo cuando la peticion sea ok.
  
          this.lista = res["objects"];
        }, (err)=>{
          // Aqui el codigo cuando la peticion sea fallida.
  
        });
    }

  ngOnInit(): void {
  }

  // Foranea de disciplina - inicio
  unselectUsuario() {
    this.usuarioObject.selected = false;
    this.usuarioObject.text = "";
    this.newPersonaForm.patchValue({
      "user_id": undefined
    });    
  }
  selectUsuario(o:any) {
    this.usuarioObject.selected = true;
    this.usuarioObject.text = o.name;
    this.newPersonaForm.patchValue({
      "user_id": o.id
    });
  }
  loadUsuario() {
    this.usuarioService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.usuarios = res["objects"];
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin

load() {
  this.personaService.index()
  .subscribe((res) => {
    // Aqui el codigo cuando la peticion sea ok.
    this.loading = false;
    this.lista = res["objects"];
  }, (err)=>{
    // Aqui el codigo cuando la peticion sea fallida.

  });    
}  


  crearPersona() {
    this.personaService
    .post(this.newPersonaForm.value.codigo,
      this.newPersonaForm.value.nombrecompleto,
      this.newPersonaForm.value.dni,
      this.newPersonaForm.value.fecha_nacimiento,
      this.newPersonaForm.value.telefono,
      this.newPersonaForm.value.foto,
      this.newPersonaForm.value.user_id)
      .subscribe((res)=>{
        if ( res['status'] ) {
          //alert(">" + res["object"]["nombre"]);
          this.list();
        }
      }, (err) => {

    })
  }

  new() {

    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  
  new1() {
    this.loadUsuario();
    this.asignarusuario.is_visible = true;
    this.asignarusuario.is_new = true;
  }

  list() {
    this.load();
    this.crud_operation.is_visible = false;
    this.crud_operation.is_new = false;    
  }

}
