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
import { UpdatePreguntaDto } from '../../dto/updatePregunta.dto';
import { UpdatePreguntasDto } from '../../dto/updatePreguntas.dto';
import { FinEncuestaComponent } from '../../dialogs/fin-encuesta/fin-encuesta.component';
import jsPDF from 'jspdf'

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
  respuestasa: String;
  preguntasRespondidas: UpdatePreguntasDto[];
  datosGrafico: any[];

  /*DATOS GRÁFICO*/
  public pieChartLabels: string[] = ["A", "B", "C"];
  // public pieChartLabels: string[];
  // public pieChartData: number[] = [21, 39, 10];
  public pieChartData: number[];
  public pieChartType: string = 'doughnut';
  // public pieChartOptions: any = {
  //   'backgroundColor': [
  //     "#FF6384",
  //     "#4BC0C0",
  //     "#FFCE56",
  //     "#E7E9ED",
  //     "#36A2EB"
  //   ]
  // }
  /*FIN DATOS GRÁFICO*/

  constructor(private encuestaService: EncuestaService,
    private router: Router,
    public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getAllPreguntas();
    // this.datos(this.preguntas);
  }

  valoresgraficos(pregunta: Pregunta) {
    if (pregunta.respuestaC == null) {
      this.pieChartData = [pregunta.nA, pregunta.nB];
    } else {
      this.pieChartData = [pregunta.nA, pregunta.nB, pregunta.nC];
    }
    return this.pieChartData;
  }

  labelsGrafico(pregunta: Pregunta) {
    if (pregunta.respuestaC == null) {
      this.pieChartLabels = ["A", "B"];
    } else {
      this.pieChartLabels = ["A", "B", "C"];
    }
    return this.pieChartLabels;
  }

  datos(preguntas: Pregunta[]) {
    for (let pregunta of preguntas) {
      this.pieChartData = [pregunta.nA, pregunta.nB, pregunta.nC]
      if (this.datosGrafico == undefined) {
        this.datosGrafico = [this.pieChartData];
      } else {
        this.datosGrafico.push(this.pieChartData);
      }
    }


    return this.datosGrafico;
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

  openDialogFinEncuesta() {
    const dialogFinEncuesta = this.dialog.open(FinEncuestaComponent, {
      width: '40%'
    });

    dialogFinEncuesta.afterClosed().subscribe(result => {
      this.router.navigate(['/component/proyectos']);
    })
  }

  public randomizeType() {
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    this.getAllPreguntas();
  }

  // // events on slice click
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  enviarEncuesta() {
    console.log('All right!')
    console.log(this.respuestas);

    for (let respuesta of this.respuestas) {
      for (let pregunta of this.preguntas) {
        if (respuesta.pregunta == pregunta.pregunta) {
          if (respuesta.respuestaMarcada == pregunta.respuestaA) {
            pregunta.nA = pregunta.nA + 1;
          } else if (respuesta.respuestaMarcada == pregunta.respuestaB) {
            pregunta.nB = pregunta.nB + 1;
          } else if (respuesta.respuestaMarcada == pregunta.respuestaC) {
            pregunta.nC = pregunta.nC + 1;
          }

          this.encuestaService.updatePregunta(pregunta.id, new UpdatePreguntaDto(pregunta.nA, pregunta.nB, pregunta.nC))
            .subscribe(result => {
              this.getAllPreguntas();
            });
        }
      }
    }

    this.openDialogFinEncuesta();
  }

  /*ENVIA UN ARRAY DE PREGUNTAS RESPONDIDAS*/
  enviarPreguntas() {
    console.log('All right!')
    console.log(this.respuestas);

    for (let respuesta of this.respuestas) {
      for (let pregunta of this.preguntas) {
        if (respuesta.pregunta == pregunta.pregunta) {
          if (respuesta.respuestaMarcada == pregunta.respuestaA) {
            pregunta.nA = pregunta.nA + 1;
          } else if (respuesta.respuestaMarcada == pregunta.respuestaB) {
            pregunta.nB = pregunta.nB + 1;
          } else if (respuesta.respuestaMarcada == pregunta.respuestaC) {
            pregunta.nC = pregunta.nC + 1;
          }

          if (this.preguntasRespondidas == undefined) {
            this.preguntasRespondidas = [new UpdatePreguntasDto(pregunta.nA, pregunta.nB, pregunta.nC)];
          } else {
            this.preguntasRespondidas.push(new UpdatePreguntasDto(pregunta.nA, pregunta.nB, pregunta.nC));
          }

        }
      }
    }

    this.encuestaService.updatePreguntas(this.preguntasRespondidas)
      .subscribe(result => {
        this.getAllPreguntas();
      });

    console.log(this.preguntas);
  }

  rellenarArrayRespuesta(pregunta: String, respuestaMarcada: String) {
    //comprobar si no se ha marcado anteriormente, y en su defecto la modifica

    let encontrada = false;
    let i = 0;
    let indice = 0;

    if (this.respuestas == undefined) {

      this.respuestas = [new PreguntaRespondidaDto(pregunta, respuestaMarcada)];

    } else {

      for (let respuestaSelec of this.respuestas) {

        if (respuestaSelec.pregunta == pregunta) {
          console.log('KAJSAHDKJ')
          encontrada = true;
          indice = i;
        }
        i++;
      }

      if (encontrada) {
        this.respuestas.splice(indice, 1);
        this.respuestas.push(new PreguntaRespondidaDto(pregunta, respuestaMarcada));
      } else {
        this.respuestas.push(new PreguntaRespondidaDto(pregunta, respuestaMarcada));
      }

    }

  }

<<<<<<< HEAD

=======
  downloadPDF() {
    /**
     * Creamos el documento PDF
     */
    var doc = new jsPDF();

    /**
     * Rellenar documento PDF, cada llamada a text(texto: String, margenIzq: number, margenTop: number)
     * anade el texto deseado en la posicion Izq y Top deseada
     */
    doc.text(this.preguntas[1].pregunta, 10, 10);
    doc.text(this.preguntas[1].respuestaA, 10, 20);
    doc.text(this.preguntas[1].respuestaB, 10, 30);
    doc.text(this.preguntas[1].respuestaC, 10, 40);
    /**
     * Se inicia la descarga del documento PDF llamando a save(nombreDocumento: String)
     */
    doc.save('ExpoFP19.pdf');
  }

  
>>>>>>> 91bc506691e2c13cb3d331c02cb23996d5a164d6

}
