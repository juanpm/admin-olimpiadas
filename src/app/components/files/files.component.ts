import {Component} from '@angular/core';
import { DesafioService } from 'src/app/services/desafio/desafio.service';
import { EquipoService } from 'src/app/services/equipo/equipo.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { MatriculaService } from 'src/app/services/matricula/matricula.service';
import { CompetidorequipoService } from 'src/app/services/competidorequipo/competidorequipo.service';


@Component({
  'templateUrl': './files.component.html',
  'selector': 'app-files',
  'styleUrls': ['./files.component.css']
})

export class FilesComponent {
  public loading: boolean;
  public loading2: boolean;
  public loading3: boolean;
  public loading4: boolean;
  public loading5: boolean;
    constructor(private desafioService : DesafioService,
      private competidorService : CompetidorequipoService,
      private equipoService : EquipoService,
      private personaService : PersonaService,
      private matriculaService : MatriculaService) {
        
    }
// changeListener(files: FileList){
//   console.log(files);
//   if(files && files.length > 0) {
//      let file : File = files.item(0); 
//        console.log(file.name);
//        console.log(file.size);
//        console.log(file.type);
//        let reader: FileReader = new FileReader();
//        reader.readAsText(file);
//        reader.onload = (e) => {
//           let csv: string = reader.result as string;
//           console.log(csv);
//        }
//     }
// }
  handleFileSelect(evt) {
    
    var files = evt.target.files; // FileList object
    var file = files[0];
    console.log(file);
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = (event: any) => {
      console.log("== Desde aqui todo el codigo que necesites para leer el archivo");
      var csv = event.target.result; // Content of CSV file
      var lines = csv.split("\n");
      var clines = [];
      for(let l of lines) {
        clines.push(l.trim());
      }
      var oo = 0;
      for(var i = 0; clines.length > i; i++) {
        if ( i == 0 ) {
            continue;
        }
        var o = clines[i];
        //console.log(o, o.split(";").length);
        if ( o.split(";").length !== 2 ) {
            break;
        }
        //var fase : number = parseInt(o.split(";")[4]);

        //if ( fase <= 0 ) {
            //break;
        //}
        var matricula_id: number = parseInt(o.split(";")[0]);
        var equipo_id: number = parseInt(o.split(";")[1]);
        
        this.competidorService.postx(matricula_id,equipo_id)
       
            .subscribe((res) => {
              this.loading = true;
              oo++;
              //console.log(">>", oo, "|",clines.length );
              if(oo > (clines.length-3)){
                alert("finalizo");
                this.loading = false;
              }
            }, (err) => {

            });
            
      }
      console.log("== hasta aqui");
    }
  }
//////////////////////////////////////////////////////////////////////
handleFileSelectequipos(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];
  console.log(file);
  var reader = new FileReader();

  reader.readAsText(file);
  reader.onload = (event: any) => {
    console.log("== Desde aqui todo el codigo que necesites para leer el archivo");
    var csv = event.target.result; // Content of CSV file
    var lines = csv.split("\n");
    var clines = [];
    for(let l of lines) {
      clines.push(l.trim());
    }
    var ii = 0;
    for(var i = 0; clines.length > i; i++) {
      if ( i == 0 ) {
          continue;
      }
      var o = clines[i];
      //console.log(o, o.split(";").length);
      if ( o.split(";").length !== 4 ) {
          break;
      }
      //var fase : number = parseInt(o.split(";")[4]);

      //if ( fase <= 0 ) {
          //break;
      //}
      var nombre: string = o.split(";")[0];
      var disciplina_id: number = parseInt(o.split(";")[1]);
      var descripcion: string = o.split(";")[2];
      var image: string = o.split(";")[3];
      //var i= 0;
      this.equipoService.postx(nombre,disciplina_id, descripcion, image)
          .subscribe((res) => {
            this.loading3 = true;
            ii++;
            //console.log(">>", oo, "|",clines.length );
            if(ii > (clines.length-3)){
              alert("finalizo");
              this.loading3 = false;
            }
          }, (err) => {

          });
          
    }
    console.log("== hasta aqui");
  }
}
/////////////////////////////////////////////////////////////////
handleFileSelect2(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];
  console.log(file);
  var reader = new FileReader();

  reader.readAsText(file);
  reader.onload = (event: any) => {
    console.log("== Desde aqui todo el codigo que necesites para leer el archivo");
    var csv = event.target.result; // Content of CSV file
    var lines = csv.split("\n");
    var clines = [];
    for(let l of lines) {
      clines.push(l.trim());
    }
    var oo = 0;
    for(var i = 0; clines.length > i; i++) {
      if ( i == 0 ) {
          continue;
      }
      var o = clines[i];
      //console.log(o, o.split(";").length);
      if ( o.split(";").length !== 5) {
          break;
      }
      var fase : number = parseInt(o.split(";")[4]);

      if ( fase <= 0 ) {
          break;
      }
      var disciplina_id: number = parseInt(o.split(";")[0]);
      var invitado_id: number = parseInt(o.split(";")[1]);
      var retador_id: number = parseInt(o.split(";")[2]);
      var invitado_puntaje: number = 0;
      var retador_puntaje: number = 0;
      var fecha : string = o.split(";")[3];
      var fase : number = parseInt(o.split(";")[4]);

      this.desafioService.posty(disciplina_id, invitado_id, retador_id, invitado_puntaje,
          retador_puntaje, fecha, fase)
          .subscribe((res) => {
            this.loading2 = true;
            oo++;
            //console.log(">>", oo, "|",clines.length );
            if(oo > (clines.length-3)){
              alert("finalizo");
              this.loading2 = false; 
            }
          }, (err) => {

          });
          
    }
    console.log("== hasta aqui");
  }
}

handleFileSelectPersonas(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];
  console.log(file);
  var reader = new FileReader();

  reader.readAsText(file);
  reader.onload = (event: any) => {
    console.log("== Desde aqui todo el codigo que necesites para leer el archivo");
    var csv = event.target.result; // Content of CSV file
    var lines = csv.split("\n");
    var clines = [];
    for(let l of lines) {
      clines.push(l.trim());
    }
    var oo = 0;
    for(var i = 0; clines.length > i; i++) {
      if ( i == 0 ) {
          continue;
      }
      var o = clines[i];
      //console.log(o, o.split(";").length);
      if ( o.split(";").length !== 6) {
          break;
      }
      /*var fase : number = parseInt(o.split(";")[4]);

      if ( fase <= 0 ) {
          break;
      }*/
      var codigo: string = o.split(";")[0];
      var nombrecompleto: string = o.split(";")[1];
      var dni: string = o.split(";")[2];
      var fecha_nacimiento: string = o.split(";")[3];
      var telefono: string = o.split(";")[4];
      var foto : string = o.split(";")[5];

      this.personaService.postx(codigo, nombrecompleto, dni, fecha_nacimiento,
          telefono, foto)
          .subscribe((res) => {
            this.loading4 = true;
            oo++;
            //console.log(">>", oo, "|",clines.length );
            if(oo > (clines.length-3)){
              alert("finalizo");
              this.loading4 = false;
            }
          }, (err) => {

          });
          
    }
    console.log("== hasta aqui");
  }
}

/////////////////////////////////////////////////////////////////
handleFileSelectMatricula(evt) {
  var files = evt.target.files; // FileList object
  var file = files[0];
  console.log(file);
  var reader = new FileReader();

  reader.readAsText(file);
  reader.onload = (event: any) => {
    console.log("== Desde aqui todo el codigo que necesites para leer el archivo");
    var csv = event.target.result; // Content of CSV file
    var lines = csv.split("\n");
    var clines = [];
    for(let l of lines) {
      clines.push(l.trim());
    }
    var oo = 0;
    for(var i = 0; clines.length > i; i++) {
      if ( i == 0 ) {
          continue;
      }
      var o = clines[i];
      //console.log(o, o.split(";").length);
      if ( o.split(";").length !== 3) {
          break;
      }
     /* var fase : number = parseInt(o.split(";")[3]);

      if ( fase <= 0 ) {
          break;
      }*/
      var carrera_id: number = parseInt(o.split(";")[0]);
      var seccionperiodo_id: number = parseInt(o.split(";")[1]);
      var persona_id: number = parseInt(o.split(";")[2]);

      this.matriculaService.postx(carrera_id, seccionperiodo_id, persona_id)
          .subscribe((res) => {
            this.loading5 = true;
            oo++;
            //console.log(">>", oo, "|",clines.length );
            if(oo > (clines.length-3)){
              alert("finalizo");
              this.loading5 = false; 
            }
          }, (err) => {

          });
          
    }
    console.log("== hasta aqui");
  }
}

}