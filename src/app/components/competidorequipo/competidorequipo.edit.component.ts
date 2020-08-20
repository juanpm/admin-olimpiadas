import { Component, OnInit } from '@angular/core';
import { CompetidorequipoService } from '../../services/competidorequipo/competidorequipo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatriculaService } from '../../services/matricula/matricula.service';
import { EquipoService } from '../../services/equipo/equipo.service';

@Component({
  selector: 'app-competidorequipo-edit',
  templateUrl: './competidorequipo.edit.component.html',
  styleUrls: ['./competidorequipo.edit.component.css']
})


export class CompetidorequipoEditComponent implements OnInit {
  lista:any=[];
  status='nothing';
  id : number;
  matriculas:any=[];
  equipos:any=[];
  newCompetidorForm;
  matriculaObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObject:any = {
    'selected': false,
    'text': '',
  };
 
  competidorObject:any = {
    'id' : 0,
    'matricula_id': 0,
    'equipo_id': 0
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private equipoService: EquipoService,
    private competidorequipoService: CompetidorequipoService,
    private activatedRoute:ActivatedRoute,
    private matriculaService: MatriculaService) { 
      this.newCompetidorForm = this.formBuilder.group({
        'matricula_id': '',
        'equipo_id': ''
      });      
      this.loadMatricula();
      this.loadEquipo();
      this.id = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.competidorequipoService.show(this.id)
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
        this.competidorObject["id"] = data.competidorResolver["competidorequipo"]["id"];
        this.competidorObject["matricula_id"] = data.competidorResolver["matricula"]["id"];
        this.competidorObject["equipo_id"] = data.competidorResolver["equipo"]["id"];
        //console.log(">>>", this.matriculaObject);
      });
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

      for(let o of this.matriculas) {
        if ( o.id === this.competidorObject.matricula_id ) {
          this.selectMatricula(o);
          break;
        }
      }      

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
    for(let o of this.equipos) {
      if ( o.id === this.competidorObject.equipo_id ) {
        this.selectEquipo(o);
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
    this.competidorequipoService
    .put(this.competidorObject.id, {
        'matricula_id': this.newCompetidorForm.value.matricula_id,
        'equipo_id': this.newCompetidorForm.value.equipo_id
      })
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Datos actualizados");
          this.router.navigate(["admin/competidorequipo"]);  
        }
      }, (err) => {

    })
  }

  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.competidorequipoService.delete(this.competidorObject.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/competidorequipo"]);
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
