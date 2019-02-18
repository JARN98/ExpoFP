import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { AddProjectComponent } from './dialogs/add-project/add-project.component';

export const Approutes: Routes = [
  {
    path: 'component',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: './component/component.module#ComponentsModule'
      }
    ]
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
  { path: '', redirectTo: '/component/inicio', pathMatch: 'full' },
];
