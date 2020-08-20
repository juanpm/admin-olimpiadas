import { Component } from "@angular/core";
import { OlimpiadaService } from "../../services/olimpiada/olimpiada.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from '@angular/forms'

@Component ({
  selector: 'app-olimpiada-edit',
  templateUrl: './olimpiada.edit.component.html',
  styleUrls: ['./olimpiada.edit.component.css']
})

export class OlimpiadaEditComponent {
  formEdit;
  id : number;
  status = 'nothing';

  constructor(private olimpiadaService : OlimpiadaService,
      private activatedRoute : ActivatedRoute,
      private formBuilder : FormBuilder,
      private router: Router){

      //Creo instancia
      this.formEdit = this.formBuilder.group({
        'id': 0,
        'nombre' : '',
        'descripcion': '',
        'fecha_inicio': '',
        'fecha_fin_inscripcion': '',
        'fecha_fin': ''
      });
      
      this.id = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.olimpiadaService.show(this.id)
        .subscribe((res)=>{

          //1 Sobre escribo
        this.formEdit.setValue({
          'id': res["object"]["id"],
          'nombre': res["object"]["nombre"],
          'descripcion': res["object"]["descripcion"],
          'fecha_inicio': res["object"]["fecha_inicio"],
          'fecha_fin_inscripcion': res["object"]["fecha_fin_inscripcion"],
          'fecha_fin': res["object"]["fecha_fin"],
        });

      }, (err)=>{
        
        //2

      });
    }
  onSubmit() {
    this.olimpiadaService.put(this.id,
      {
        'nombre': this.formEdit.value.nombre,
        'descripcion': this.formEdit.value.descripcion,
        'fecha_inicio': this.formEdit.value.fecha_inicio,
        'fecha_fin_inscripcion': this.formEdit.value.fecha_fin_inscripcion,
        'fecha_fin': this.formEdit.value.fecha_fin,
        'visible': true
      }).subscribe((res) => {
        alert("Felicidades");
        this.router.navigate(["admin/olimpiada"]);
      },(err)=>{
        alert("Sigue intentando");
      });
  }
  delete() {
    if ( this.status === "waiting" ) {
      return;
    }
    this.status = "waiting";

    this.olimpiadaService.delete(this.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["/admin/olimpiada"]);
      }, (err)=>{
        this.status = "error";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);  

        alert("Sigue intentando");
      });
  }
}