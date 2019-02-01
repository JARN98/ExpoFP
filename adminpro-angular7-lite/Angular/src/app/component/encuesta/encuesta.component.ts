import { Component, OnInit } from '@angular/core';
import { ListApiResponse } from '../../interfaces/list-api.interface';
import { Pregunta } from '../../interfaces/pregunta.interface';
import { EncuestaService } from '../../services/encuesta.service';
import { Router } from '@angular/router';
import { AddPreguntaComponent } from '../../dialogs/add-pregunta/add-pregunta.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { PreguntaRespondida } from '../../interfaces/preguntaRespondida.interface';
import { PreguntaRespondidaDto } from '../../dto/preguntaRespondida.dto';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  listaApi: ListApiResponse;
  preguntas: Pregunta[];
  respuestaMarcada: String[];
  respuestas: PreguntaRespondidaDto[];
  // respuestas: Array<PreguntaRespondidaDto>;
  respuestasa: String;

  /*DATOS GRÁFICO*/
  public pieChartLabels: string[] = ["A", "B", "C"];
  public pieChartData: number[] = [21, 39, 10];
  public pieChartType: string = 'doughnut';
  public pieChartOptions: any = {
    'backgroundColor': [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      "#E7E9ED",
      "#36A2EB"
    ]
  }
  /*FIN DATOS GRÁFICO*/

  constructor(private encuestaService: EncuestaService,
    private router: Router,
    public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getAllPreguntas();
  }

  getAllPreguntas() {
    this.encuestaService.listPreguntas().subscribe(list => {
      this.listaApi = list;
      this.preguntas = this.listaApi.rows;
      console.log(this.preguntas);
    }, error => {
      console.error(error);
    });
  }

  deletePregunta(id: number) {
    this.encuestaService.deletePregunta(id).subscribe(result => {
      this.getAllPreguntas();
    }), error => {
      console.error(error);
    }
  }

  openDialogAddPregunta() {

    const dialogoAddRec = this.dialog.open(AddPreguntaComponent, {
      width: '50%',
    });

    dialogoAddRec.afterClosed().subscribe(result => {
      this.getAllPreguntas();
    });

  }

  public randomizeType():void {
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  enviarEncuesta(){
    console.log('All right!')
    console.log(this.respuestas);
    for(let respuesta of this.respuestas){

    }
  }

  rellenarArrayRespuesta(pregunta: String, respuestaMarcada: String){
    //comprobar si no se ha marcado anteriormente, y en su defecto la modifica

  //   let encontrada = false;
  //   let i=0;

  //   if(this.respuestas == undefined){

  //     this.respuestas = [new PreguntaRespondidaDto(pregunta, respuestaMarcada)];
      
  //   } else {

  //     for(let respuestaSelec of this.respuestas){
  //       i++;
        
  //       if(respuestaSelec.pregunta == pregunta){
  //         this.respuestas.splice(i, 1);
  //         encontrada=true;
  //       }
  //     }

  //     this.respuestas.push(new PreguntaRespondidaDto(pregunta, respuestaMarcada));

  //   }

    

  //   console.log(this.respuestas==undefined)
   }

}
