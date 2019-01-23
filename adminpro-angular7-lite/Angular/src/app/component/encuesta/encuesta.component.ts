import { Component, OnInit } from '@angular/core';
import { ListApiResponse } from '../../interfaces/list-api.interface';
import { Pregunta } from '../../interfaces/pregunta.interface';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';
import { AddPreguntaComponent } from '../../dialogs/add-pregunta/add-pregunta.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  listaApi: ListApiResponse;
  preguntas: Pregunta[];

  constructor(private encuestaService: EncuestaService,
    private router: Router,
    public dialog: MatDialog) { }

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

  openDialogAddPregunta() {
    const dialogoAddRec = this.dialog.open(AddPreguntaComponent, {
      width: '50%',
    });

    dialogoAddRec.afterClosed().subscribe(result => {
      this.getAllPreguntas();
    });

  }

}
