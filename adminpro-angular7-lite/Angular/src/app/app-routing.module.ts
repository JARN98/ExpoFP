import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { AddProjectComponent } from './dialogs/add-project/add-project.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/component/proyectos', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      }
    ]
  },
  {
    path: 'prueba1',
    component: AddProjectComponent
  },
  {
    path: 'session',
    children: [
      {
        path: '',
        loadChildren: './session/session.module#SessionModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
