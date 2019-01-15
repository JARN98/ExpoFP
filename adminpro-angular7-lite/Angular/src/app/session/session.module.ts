import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Sessionroutes } from './session-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessionService } from '../services/session.service';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Sessionroutes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTabsModule
  ],
  providers: [
    SessionService
  ]
})
export class SessionModule { }
