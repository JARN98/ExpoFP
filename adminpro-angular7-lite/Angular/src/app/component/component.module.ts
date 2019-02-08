import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { MatTableModule } from '@angular/material/table';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ProyectoDetalladoComponent } from './proyecto-detallado/proyecto-detallado.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule, MatButtonModule, MatChipsModule } from '@angular/material';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    MatTableModule,
    FilterPipeModule,
    NgxPaginationModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    ChartsModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
    MatChipsModule

  ],
  declarations: [

    UsuarioListComponent,
    ListaProyectosComponent,
    ProyectoDetalladoComponent,
    EncuestaComponent,
    InicioComponent,


  ]
})
export class ComponentsModule { }
