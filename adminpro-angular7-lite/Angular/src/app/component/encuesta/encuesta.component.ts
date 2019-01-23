import { Component, OnInit } from '@angular/core';
import { ListApiResponse } from '../../interfaces/list-api.interface';
import { Pregunta } from '../../interfaces/pregunta.interface';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  listaApi: ListApiResponse;
  preguntas: Pregunta[];

  constructor(private encuestaService: EncuestaService,
    private router: Router) { }

  ngOnInit() {
    this.getAllPreguntas();
  }

  getAllPreguntas(){
    this.encuestaService.listPreguntas().subscribe(list => {
      this.listaApi = list;
      this.preguntas = this.listaApi.rows;
      console.log(this.preguntas);
    }, error => {
      console.error(error);
    });
  }

}
