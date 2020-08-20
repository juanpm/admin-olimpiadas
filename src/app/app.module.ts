import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OlimpiadaComponent } from './components/olimpiada/olimpiada.component';
import { OlimpiadaShowComponent } from './components/olimpiada/olimpiada.show.component';
import { OlimpiadaEditComponent } from './components/olimpiada/olimpiada.edit.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaShowComponent } from './components/persona/persona.show.component';
import { PersonaEditComponent } from './components/persona/persona.edit.component';
import { HeaderComponent } from './components/header/header.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { CarreraShowComponent } from './components/carrera/carrera.show.component';
import { CarreraEditComponent } from './components/carrera/carrera.edit.component';
import { SeccionComponent } from './components/seccion/seccion.component';
import { SeccionShowComponent } from './components/seccion/seccion.show.component';
import { SeccionEditComponent } from './components/seccion/seccion.edit.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioEditComponent } from './components/usuario/usuario.edit.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { MatriculaShowComponent } from './components/matricula/matricula.show.component';
import { MatriculaEditComponent } from './components/matricula/matricula.edit.component';
import { DesafioComponent } from './components/desafio/desafio.component';
import { DesafioShowComponent } from './components/desafio/desafio.show.component';
import { DesafioEditComponent } from './components/desafio/desafio.edit.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { EquipoShowComponent } from './components/equipo/equipo.show.component';
import { EquipoEditComponent } from './components/equipo/equipo.edit.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { DisciplinaShowComponent } from './components/disciplina/disciplina.show.component';
import { DisciplinaEditComponent } from './components/disciplina/disciplina.edit.component';
import { CompetidorequipoComponent } from './components/competidorequipo/competidorequipo.component';
import { CompetidorequipoShowComponent } from './components/competidorequipo/competidorequipo.show.component';
import { CompetidorequipoEditComponent } from './components/competidorequipo/competidorequipo.edit.component';
import { UsuarioLoginComponent } from './components/usuario/usuario.login.component';
import { UsuarioEditarComponent } from './components/usuario/usuario.editar.component';
import { FilesComponent } from './components/files/files.component';
import { ReportesEquipoComponent } from './components/reportes/reportes.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxPaginationModule } from 'ngx-pagination'; 
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    OlimpiadaComponent,
    OlimpiadaShowComponent,
    OlimpiadaEditComponent,
    PersonaComponent,
    PersonaShowComponent,
    PersonaEditComponent,
    HeaderComponent,
    CarreraComponent,
    CarreraShowComponent,
    CarreraEditComponent,
    SeccionComponent,
    SeccionShowComponent,
    SeccionEditComponent,
    UsuarioComponent,
    UsuarioEditComponent,
    MatriculaComponent,
    MatriculaShowComponent,
    MatriculaEditComponent,
    DesafioComponent,
    DesafioShowComponent,
    DesafioEditComponent,
    EquipoComponent,
    EquipoShowComponent,
    EquipoEditComponent,
    DisciplinaComponent,
    DisciplinaShowComponent,
    DisciplinaEditComponent,
    CompetidorequipoComponent,
    CompetidorequipoShowComponent,
    CompetidorequipoEditComponent,
    UsuarioLoginComponent,
    FilesComponent,
    ReportesEquipoComponent,
    UsuarioEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
