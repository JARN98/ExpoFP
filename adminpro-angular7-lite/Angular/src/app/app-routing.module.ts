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
      { path: '', redirectTo: '/session/login', pathMatch: 'full' },
      {
        path: 'component',
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
  {
    path: '**',
    redirectTo: '/starter'
  }
];
