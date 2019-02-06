import { Routes } from '@angular/router';


import { FullComponent } from '../layouts/full/full.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { ProyectoDetalladoComponent } from './proyecto-detallado/proyecto-detallado.component';
import { EncuestaComponent } from './encuesta/encuesta.component';


export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listaUsuarios',
        component: UsuarioListComponent
      },
      {
        path: 'proyectoDetallado',
        component: ProyectoDetalladoComponent
      },
      {
        path: 'proyectos',
        component: ListaProyectosComponent,
        data: {
          title: 'Proyectos',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Proyectos' }
          ]
        }
      },
      {
        path: 'encuesta',
        component: EncuestaComponent
      }
    ]
  }
];
