import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OlimpiadaComponent } from './components/olimpiada/olimpiada.component';
import { OlimpiadaShowComponent } from './components/olimpiada/olimpiada.show.component';
import { OlimpiadaEditComponent } from './components/olimpiada/olimpiada.edit.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaShowComponent } from './components/persona/persona.show.component';
import { PersonaEditComponent } from './components/persona/persona.edit.component';
import { PersonaResolver } from './resolvers/persona.resolver';
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
import { MatriculaResolver } from './resolvers/matricula.resolver';
import { SeccionResolver } from './resolvers/seccion.resolver';
import { DesafioComponent } from './components/desafio/desafio.component';
import { DesafioShowComponent } from './components/desafio/desafio.show.component';
import { DesafioEditComponent } from './components/desafio/desafio.edit.component';
import { DesafioResolver } from './resolvers/desafio.resolver';
import { EquipoComponent } from './components/equipo/equipo.component';
import { EquipoShowComponent } from './components/equipo/equipo.show.component';
import { EquipoEditComponent } from './components/equipo/equipo.edit.component';
import { EquipoResolver } from './resolvers/equipo.resolver';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { DisciplinaShowComponent } from './components/disciplina/disciplina.show.component';
import { DisciplinaEditComponent } from './components/disciplina/disciplina.edit.component';
import { CompetidorequipoComponent } from './components/competidorequipo/competidorequipo.component';
import { CompetidorequipoShowComponent } from './components/competidorequipo/competidorequipo.show.component';
import { CompetidorequipoEditComponent } from './components/competidorequipo/competidorequipo.edit.component';
import { CompetidorResolver } from './resolvers/competidor.resolver';

import { DisciplinaResolver } from './resolvers/disciplina.resolver';
import { FilesComponent } from './components/files/files.component';
import { ReportesEquipoComponent } from './components/reportes/reportes.component';

import { UsuarioEditarComponent } from './components/usuario/usuario.editar.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'admin/olimpiada', component: OlimpiadaComponent
  },
  {
    path: 'admin/olimpiada/:id',component: OlimpiadaShowComponent
  },
  {
    path: 'admin/olimpiada/:id/edit', component: OlimpiadaEditComponent
  },
  {
    path: 'admin/persona', component: PersonaComponent
  },
  {
    path: 'admin/persona/:id',component: PersonaShowComponent
  },
  {
    path: 'admin/persona/:id/edit', component: PersonaEditComponent,
    resolve: {
      personaResolver: PersonaResolver,
    }
  },
  {
    path: 'admin/carrera', component: CarreraComponent
  },
  {
    path: 'admin/carrera/:id', component: CarreraShowComponent
  },
  {
    path: 'admin/carrera/:id/edit', component: CarreraEditComponent
  },
   {
    path: 'admin/seccion', component: SeccionComponent
  },
  {
    path: 'admin/seccion/:id', component: SeccionShowComponent,
    resolve: {
      seccionResolver: SeccionResolver,
    }
  },
  {
    path: 'admin/seccion/:id/edit', component: SeccionEditComponent
  },
  {
    path: 'admin/usuario', component: UsuarioComponent
  },
  {
    path: 'admin/usuario/:id', component: UsuarioEditComponent
  },
  {
    path: 'admin/usuario/:id/editar', component: UsuarioEditarComponent
  },
  /*{
    path: 'admin/singup', component: UsuarioSingupComponent
  },*/
  {
    path: 'admin/matricula', component: MatriculaComponent
  },
  {
    path: 'admin/matricula/:id', component: MatriculaShowComponent
  },
  {
    path: 'admin/matricula/:id/edit', component: MatriculaEditComponent, 
    resolve: {
      matriculaResolver: MatriculaResolver,
    }
  },
  {
    path: 'admin/desafio', component: DesafioComponent,
  },
  {
    path: 'admin/desafio/:id', component: DesafioShowComponent,
  },
  {
    path: 'admin/desafio/:id/edit', component: DesafioEditComponent,
    resolve: {
      desafioResolver: DesafioResolver,
    }
  },
  {
    path: 'admin/equipo', component: EquipoComponent
  },
  {
    path: 'admin/equipo/:id', component: EquipoShowComponent
  },
  {
    path: 'admin/equipo/:id/edit', component: EquipoEditComponent,
    resolve: {
      equipoResolver: EquipoResolver,
    }
  },
  {
    path: 'admin/disciplina', component: DisciplinaComponent
  },
  {
    path: 'admin/disciplina/:id', component: DisciplinaShowComponent
  },
  {
    path: 'admin/disciplina/:id/edit', component: DisciplinaEditComponent,
    resolve: {
      disciplinaResolver: DisciplinaResolver,
    }
  },
  {
    path: 'admin/competidorequipo', component: CompetidorequipoComponent
  },
  {
    path: 'admin/competidorequipo/:id', component: CompetidorequipoShowComponent
  },
  {
    path: 'admin/competidorequipo/:id/edit', component: CompetidorequipoEditComponent,
    resolve: {
      competidorResolver: CompetidorResolver,
    }
  },
  {
    path: 'admin/files', component: FilesComponent
  },
 {
    path: 'reportes/ganador',
    component: ReportesEquipoComponent
  }
  // {
  //   path: 'admin/login', component: UsuarioLoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
