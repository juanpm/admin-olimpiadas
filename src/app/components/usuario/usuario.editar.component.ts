import { Component } from "@angular/core";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component ({
  selector: 'app-usuario-editar',
  templateUrl: './usuario.editar.component.html',
  styleUrls: ['./usuario.editar.component.css']
})

export class UsuarioEditarComponent {
  formEdit;
  id : number;
  status = 'nothing';

  constructor(private usuarioService : UsuarioService,
      private activatedRoute : ActivatedRoute,
      private formBuilder : FormBuilder,
      private router: Router){

      //Creo instancia
      this.formEdit = this.formBuilder.group({
        'id': 0,
        'name' : '',
        'email': '',
        'password': '',
      });
      
      this.id = parseInt(this.activatedRoute.
        snapshot.paramMap.get("id"));

      this.usuarioService.showedit(this.id)
        .subscribe((res)=>{

          //1 Sobre escribo
        this.formEdit.setValue({
          'id': res["object"]["user"]["id"],
          'name': res["object"]["user"]["name"],
          'email': res["object"]["user"]["email"],
          'password': ""
        });

      }, (err)=>{
        
        //2

      });
    }
  onSubmit() {
    this.usuarioService.put(this.id,
      {
        'name': this.formEdit.value.name,
        'email': this.formEdit.value.email,
        'password': this.formEdit.value.password
      }).subscribe((res) => {
        alert("Felicidades");
        this.router.navigate(["admin/usuario"]);
      },(err)=>{
        alert("Sigue intentando");
      });
  }
  delete() {
    if ( this.status === "waiting" ) {
      return;
    }
    this.status = "waiting";

    this.usuarioService.delete(this.id)
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

