import { Component, OnInit } from '@angular/core';
import { ListProjectsResponse } from '../../interfaces/list-projects-res.interface';
import { ListProjectsResService } from '../../services/list-projects-res.service';
import { ListApiResponse } from '../../interfaces/list-api.interface';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {
  listaApi: ListApiResponse;
  listaProyectosRes: ListProjectsResponse[];
  proyectoFilter: any = { nombre: '' };

  constructor(private projectService: ListProjectsResService) { }

  ngOnInit() {
    this.getAllProyectos()
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
}
