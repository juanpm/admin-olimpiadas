import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EquipoService } from '../../services/equipo/equipo.service';

@Component({
  selector: 'app-equipo-edit',
  templateUrl: './equipo.edit.component.html',
  styleUrls: ['./equipo.edit.component.css']
})


export class EquipoEditComponent implements OnInit {
  lista:any=[];
  status='nothing';
  formEdit;
  id : number;
  disciplinas:any=[];
  newEquipoForm;
  disciplinaObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObject:any = {
    'id' : 0,
    'nombre': '',
    'disciplina_id': 0,
    'descripcion' : '',
    'image' : ''
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private equipoService: EquipoService,
    private activatedRoute:ActivatedRoute,
    private disciplinaService: DisciplinaService) { 
      this.newEquipoForm = this.formBuilder.group({
        'nombre': '',
        'disciplina_id': '',
        'descripcion': '',
        'image': ''
      });      
      this.loadDisciplina();

       this.id = parseInt(this.activatedRoute.
         snapshot.paramMap.get("id"));

       this.equipoService.show(this.id)
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
        this.equipoObject["id"] = data.equipoResolver["equipo"]["id"];
        this.equipoObject["disciplina_id"] = data.equipoResolver["disciplina"]["id"];
        //console.log(">>>", this.matriculaObject);
        this.newEquipoForm.patchValue({
          'nombre' : data.equipoResolver.nombre,
          'descripcion' : data.equipoResolver.descripcion,
          'image' : data.equipoResolver.image
          //     'id': res["object"]["id"],
          //     'nombre': res["object"]["nombre"],
          //     'participantes': res["object"]["participantes"],
          //   });
        });
      });
    }
  // Foranea de carrera - inicio
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

      for(let o of this.disciplinas) {
        if ( o.id === this.equipoObject.disciplina_id ) {
          this.selectDisciplina(o);
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
    this.equipoService
    .put(this.equipoObject.id, {
        'nombre': this.newEquipoForm.value.nombre,
        'disciplina_id': this.newEquipoForm.value.disciplina_id,
        'descripcion': this.newEquipoForm.value.descripcion,
        'image': this.newEquipoForm.value.image
      })
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Datos Actualizados");
          this.router.navigate(["admin/equipo"]);
        }
      }, (err) => {

    })
  }

  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.equipoService.delete(this.equipoObject.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/equipo"]);
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
