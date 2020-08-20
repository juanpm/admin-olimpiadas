import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona.edit.component.html',
  styleUrls: ['./persona.edit.component.css']
})


export class PersonaEditComponent implements OnInit {
  lista:any=[];
  status='nothing';
  formEdit;
  id : number;
  usuarios:any=[];
  newPersonaForm;
  usuarioObject:any = {
    'selected': false,
    'text': '',
  };
  personaObject:any = {
    'id' : 0,
    'codigo': '',
    'nombrecompleto': '',
    'apellido': '',
    'dni': '',
    'fecha_nacimiento':0,
    'telefono': '',
    'foto': '',
    'user_id': 0
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private personaService: PersonaService,
    private activatedRoute:ActivatedRoute,
    private usuarioService: UsuarioService) { 
      this.newPersonaForm = this.formBuilder.group({
        'codigo': '',
        'nombrecompleto': '',
        'dni': '',
        'fecha_nacimiento':'',
        'telefono': '',
        'foto': '',
        'user_id': ''
      });      
      this.loadUsuario();

       this.id = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

       this.personaService.show(this.id)
         .subscribe((res)=>{

      //     //1 Sobre escribo
      //   this.formEdit.setValue({
      //     'id': res["object"]["id"],
      //     'nombre': res["object"]["nombre"],
      //     'participantes': res["object"]["participantes"],
      //   });

     }, (err)=>{
        
      //   //2

       });
    }

    ngOnInit() {
      this.activatedRoute.data.subscribe((data) => {
        //console.log(">>", data);
        this.personaObject["id"] = data.personaResolver["id"];
        this.personaObject["user_id"] = data.personaResolver["user_id"];
        //console.log(">>>", this.matriculaObject);
        this.newPersonaForm.patchValue({
          'codigo' : data.personaResolver.codigo,
          'nombrecompleto' : data.personaResolver.nombrecompleto,
          'dni' : data.personaResolver.dni,
          'fecha_nacimiento' : data.personaResolver.fecha_nacimiento,
          'telefono' : data.personaResolver.telefono,
          'foto' : data.personaResolver.foto
          //     'id': res["object"]["id"],
          //     'nombre': res["object"]["nombre"],
          //     'participantes': res["object"]["participantes"],
          //   });
        });
      });
    }
  // Foranea de carrera - inicio
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

      for(let o of this.usuarios) {
        if ( o.id === this.personaObject.user_id ) {
          this.selectUsuario(o);
          break;
        }
      }      
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin

// loadPersona() {
//   this.personaService.index()
//   .subscribe((res) => {
//     // Aqui el codigo cuando la peticion sea ok.

//     this.personas = res["objects"];
//   }, (err)=>{
//     // Aqui el codigo cuando la peticion sea fallida.

//   });    
// }  
// Fin

onSubmit() {
    this.personaService
    .put(this.personaObject.id, {
        'codigo': this.newPersonaForm.value.codigo,
        'nombrecompleto': this.newPersonaForm.value.nombrecompleto,
        'dni': this.newPersonaForm.value.dni,
        'fecha_nacimiento': this.newPersonaForm.value.fecha_nacimiento,
        'telefono': this.newPersonaForm.value.telefono,
        'foto': this.newPersonaForm.value.foto,
        'user_id': this.newPersonaForm.value.user_id
      })
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Datos Actualizados");
          this.router.navigate(["admin/persona"]);
        }
      }, (err) => {

    })
  }

  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.personaService.delete(this.personaObject.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/persona"]);
      }, (err)=>{
        this.status = "error";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);  

        alert("Sigue intentando");
      });
  }
  // new() {
  //   this.loadCarrera();
  //   this.loadSeccion();
  //   this.loadPersona();
  // }
}
