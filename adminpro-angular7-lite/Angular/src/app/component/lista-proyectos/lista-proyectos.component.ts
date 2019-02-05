import { Component, OnInit } from '@angular/core';
import { ListProjectsResponse } from '../../interfaces/list-projects-res.interface';
import { ListProjectsResService } from '../../services/list-projects-res.service';
import { ListApiResponse } from '../../interfaces/list-api.interface';
import { MatDialog } from '@angular/material';
import { AddProjectComponent } from '../../dialogs/add-project/add-project.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DeleteProjectComponent } from '../../dialogs/delete-project/delete-project.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css'],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .heart {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `
  ]
  
})
export class ListaProyectosComponent implements OnInit {
  listaApi: ListApiResponse;
  listaProyectosRes: ListProjectsResponse[];
  proyectoFilter: any = { nombre: '' };
  admin: boolean;
  user:boolean;
  proyect: any;
  valoracionMedia: number;
  currentRate = 8;
  currentRate2 = 2;
  selected = 0;
  hovered = 0;
  readonly = false;
  // for form integration
  ctrl = new FormControl(null, Validators.required);

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  constructor(private projectService: ListProjectsResService,
    public dialog: MatDialog,
    private router: Router,
    private loginService: AuthService) { }

  ngOnInit() {
    this.getAllProyectos();
    this.admin = this.loginService.isAdmin();
    this.user = this.loginService.isUser();
    console.log(this.admin);
  }
  getAllProyectos() {
    this.projectService.listProjectsRes().subscribe(lista => {
      this.listaApi = lista;
      this.listaProyectosRes = this.listaApi.rows;
      console.log(this.listaProyectosRes);

    }, error => {
      console.error(error);
    });
  }

  openDialogAddProject() {
    const dialogoAddRec = this.dialog.open(AddProjectComponent, {
      width: '40%',
      data: { proyecto: undefined }
    });

    dialogoAddRec.afterClosed().subscribe(result => {
      this.getAllProyectos();
    });

  }

  openDialogEditProject(proyecto) {
    localStorage.setItem('idDeProyecto', proyecto);
    const dialogoAddRec = this.dialog.open(AddProjectComponent, {
      width: '40%',
      data: { proyecto: proyecto }
    });

    dialogoAddRec.afterClosed().subscribe(result => {
      this.getAllProyectos();
    });

  }

  openDialogDeleteProject(proyecto) {
    const dialogoDeleteProject = this.dialog.open(DeleteProjectComponent, {
      data: { id: proyecto.id,
              nombre: proyecto.nombre
            }
    });
    dialogoDeleteProject.afterClosed().subscribe(result => {
      this.getAllProyectos();
    });
  }

  VerProyecto(proyecto) {
    localStorage.setItem('idDeProyecto', proyecto);
    this.router.navigate(['component/proyectoDetallado']);
  }
}
