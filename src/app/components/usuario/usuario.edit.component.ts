import {Component} from '@angular/core';
import {UsuarioService } from '../../services/usuario/usuario.service';
import {RolService } from '../../services/rol/rol.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  'selector': 'app-usuario-edit',
  'templateUrl': './usuario.edit.component.html',
  'styleUrls': ['./usuario.edit.component.css']
})

export class UsuarioEditComponent{

  public loading: boolean;
  id : number;
  status = 'nothing';
  us:any = {
    "user": {},
    "rols": [],
  };
  rols:any = []

  constructor(private usuarioService : UsuarioService, 
      private activatedRoute : ActivatedRoute, 
      private formBuilder : FormBuilder, 
      private rolService : RolService,
      private router : Router){
      
      this.refresh();
      this.loading = true;

  }

  refresh() {
    this.id = parseInt(this.activatedRoute.
      snapshot.paramMap.get("id"));

    this.usuarioService.show(this.id)
      .subscribe((res)=>{
        this.us = res["object"];

      }, (err)=>{
        
        //2

      });
    this.rolService.index().subscribe((res) => {
      this.loading = false;
      this.rols = res["objects"];
    }, (err) => {

    });
  }

  addRol(idRol:number) {
    this.usuarioService.addRol(this.us.user.id, idRol).
      subscribe((res)=>{
        this.refresh();
      }, (err)=>{
        alert("Error!");
      });
  }
  deleteRol(idUserRol:number) {
    this.usuarioService.deleteRol(idUserRol).
      subscribe((res)=>{
        this.refresh();
      }, (err)=>{
        alert("Error!");
      });
  }  
}