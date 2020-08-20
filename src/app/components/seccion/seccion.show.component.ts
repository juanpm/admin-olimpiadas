import {Component} from '@angular/core';
import { SeccionService} from '../../services/seccion/seccion.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  'selector': 'app-seccion-show',
  'templateUrl': './seccion.show.component.html',
  styleUrls: ['./seccion.show.component.css']
})

export class SeccionShowComponent{
secc:any;
public loading: boolean;
constructor(private seccionService: SeccionService,
private activatedRoute:ActivatedRoute){
  var id:number = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
  

  this.secc = {
    'nombre': 'Desconocido',
    'id': 0
  }

  // this.disciplinaService.show(id)
  //   .subscribe((res) => {
      
  //     this.dis.nombre = res["object"]["nombre"];
  //     this.dis.id = res["object"]["id"];

  //   }, (err)=> {

  //   })

}
ngOnInit() {
  this.activatedRoute.data.subscribe((data) => {
    this.secc["id"] = data.seccionResolver["id"];
    this.secc["nombre"] = data.seccionResolver["nombre"];
    //console.log(">>>", );
  });
}
}