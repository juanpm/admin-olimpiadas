import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { OlimpiadaService } from '../../services/olimpiada/olimpiada.service';

@Component({
  selector: 'app-disciplina-edit',
  templateUrl: './disciplina.edit.component.html',
  styleUrls: ['./disciplina.edit.component.css']
})


export class DisciplinaEditComponent implements OnInit {
  lista:any=[];
  status='nothing';
  formEdit;
  id : number;
  olimpiadas:any=[];
  newDisciplinaForm;
  olimpiadaObject:any = {
    'selected': false,
    'text': '',
  };
  disciplinaObject:any = {
    'id' : 0,
    'nombre': '',
    'participantes': '',
    'olimpiada_id' : 0
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private olimpiadaService: OlimpiadaService,
    private activatedRoute:ActivatedRoute,
    private disciplinaService: DisciplinaService) { 
      this.newDisciplinaForm = this.formBuilder.group({
        'nombre': '',
        'participantes': '',
        'olimpiada_id': ''
      });      
      this.loadOlimpiada();

       this.id = parseInt(this.activatedRoute.
         snapshot.paramMap.get("id"));

       this.disciplinaService.show(this.id)
         .subscribe((res)=>{

      //     //1 Sobre escribo
      //   this.formEdit.setValue({
      //     'id': res["object"]["id"],
      //     'nombre': res["object"]["nombre"],
      //     'participantes': res["object"]["participantes"],
      //  });

       }, (err)=>{
        
      //   //2

       });
    }

    ngOnInit() {
      this.activatedRoute.data.subscribe((data) => {
        //console.log(">>", data);
        this.disciplinaObject["id"] = data.disciplinaResolver["disciplina"]["id"];
        this.disciplinaObject["olimpiada_id"] = data.disciplinaResolver["olimpiada"]["id"];
        //console.log(">>>", this.matriculaObject);
        this.newDisciplinaForm.patchValue({
          'nombre' : data.disciplinaResolver.nombre,
          'participantes' : data.disciplinaResolver.participantes
          //     'id': res["object"]["id"],
          //     'nombre': res["object"]["nombre"],
          //     'participantes': res["object"]["participantes"],
          //   });
        });
      });
    }
  // Foranea de carrera - inicio
  unselectOlimpiada() {
    this.olimpiadaObject.selected = false;
    this.olimpiadaObject.text = "";
    this.newDisciplinaForm.patchValue({
      "olimpiada_id": undefined
    });    
  }
  selectOlimpiada(o:any) {
    this.olimpiadaObject.selected = true;
    this.olimpiadaObject.text = o.nombre;
    this.newDisciplinaForm.patchValue({
      "olimpiada_id": o.id
    });
  }
  loadOlimpiada() {
    this.olimpiadaService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.olimpiadas = res["objects"];

      for(let o of this.olimpiadas) {
        if ( o.id === this.disciplinaObject.olimpiada_id ) {
          this.selectOlimpiada(o);
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
    this.disciplinaService
    .put(this.disciplinaObject.id, {
        'nombre': this.newDisciplinaForm.value.nombre,
        'participantes': this.newDisciplinaForm.value.participantes,
        'olimpiada_id': this.newDisciplinaForm.value.olimpiada_id
      })
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Datos Actualizados");
          this.router.navigate(["admin/disciplina"])
        }
      }, (err) => {

    })
  }

  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.disciplinaService.delete(this.disciplinaObject.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/disciplina"]);
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
