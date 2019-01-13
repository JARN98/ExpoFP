import { Component, OnInit } from '@angular/core';
/*import { ListProjectsResponse } from 'src/app/interfaces/list-projects-res.interface';
import { ListProjectsResService } from 'src/app/services/list-projects-res.service';*/
import { FilterPipe } from 'ngx-filter-pipe';
import { ListProjectsResponse } from '../../interfaces/list-projects-res.interface';
import { ListProjectsResService } from '../../services/list-projects-res.service';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.css']
})
export class ListaProyectosComponent implements OnInit {
  listaProyectosRes: ListProjectsResponse[];
  collection: any[];
  proyectoFilter: any = { nombre: '' };
  p: Number = 1;

  constructor(private projectService: ListProjectsResService,
    /*private filterPipe: FilterPipe*/) { }

  ngOnInit() {
  }
  getAllCategoria() {
    this.projectService.listProjectsRes().subscribe(lista => {
      this.listaProyectosRes = lista;
      this.collection = lista;
    }, error => {
      console.error(error);
    });
  }
}
