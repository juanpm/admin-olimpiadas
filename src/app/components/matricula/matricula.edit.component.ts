import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula/matricula.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CarreraService } from '../../services/carrera/carrera.service';
import { SeccionService } from '../../services/seccion/seccion.service';
import { PersonaService } from '../../services/persona/persona.service';

@Component({
  selector: 'app-matricula-edit',
  templateUrl: './matricula.edit.component.html',
  styleUrls: ['./matricula.edit.component.css']
})


export class MatriculaEditComponent implements OnInit {
  lista:any=[];
  status='nothing';
  id : number;
  carreras:any=[];
  secciones:any=[];
  personas:any=[];
  newMatriculaForm;
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
  matriculaObject:any = {
    'id' : 0,
    'carrera_id': 0,
    'seccionperiodo_id': 0
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private carreraService: CarreraService,
    private seccionService: SeccionService,
    private personaService: PersonaService,
    private activatedRoute:ActivatedRoute,
    private matriculaService: MatriculaService) { 
      this.newMatriculaForm = this.formBuilder.group({
        'carrera_id': '',
        'persona_id': '',
        'seccionperiodo_id': ''
      });      
      this.loadCarrera();
      this.loadSeccion();

      this.id = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

       this.matriculaService.show(this.id)
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
        this.matriculaObject["id"] = data.matriculaResolver["matricula"]["id"];
        this.matriculaObject["carrera_id"] = data.matriculaResolver["carrera"]["id"];
        this.matriculaObject["seccionperiodo_id"] = data.matriculaResolver["seccion"]["id"];
        //console.log(">>>", this.matriculaObject);
      });
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

      for(let o of this.carreras) {
        if ( o.id === this.matriculaObject.carrera_id ) {
          this.selectCarrera(o);
          break;
        }
      }      

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
    for(let o of this.secciones) {
      if ( o.id === this.matriculaObject.seccionperiodo_id ) {
        this.selectSeccion(o);
        break;
      }
    }
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
  this.personaObject.text = o.nombre;
  this.newMatriculaForm.patchValue({
    "persona_id": o.id
  });
}
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
    this.matriculaService
    .put(this.matriculaObject.id, {
        'carrera_id': this.newMatriculaForm.value.carrera_id,
        'seccionperiodo_id': this.newMatriculaForm.value.seccionperiodo_id
      })
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Datos Actualizados");
          this.router.navigate(["admin/matricula"]);
        }
      }, (err) => {

    })
  }

  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.matriculaService.delete(this.matriculaObject.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/matricula"]);
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
