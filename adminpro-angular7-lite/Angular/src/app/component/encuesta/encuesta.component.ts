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
import jsPDF from 'jspdf';
import { DisableEncuestaDto } from '../../dto/disableEncuesta.dto';
import { ExportToCsv } from 'export-to-csv';

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
  disableEncuesa: DisableEncuestaDto;
  encuesta = localStorage.getItem('encuesta');

  /*DATOS GRÁFICO*/
  public pieChartLabels: string[] = ['A', 'B', 'C'];
  // public pieChartLabels: string[];
  // public pieChartData: number[] = [21, 39, 10];
  public pieChartData: number[];
  public pieChartType = 'doughnut';
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
      this.pieChartLabels = ['A', 'B'];
    } else {
      this.pieChartLabels = ['A', 'B', 'C'];
    }
    return this.pieChartLabels;
  }

  datos(preguntas: Pregunta[]) {
    for (const pregunta of preguntas) {
      this.pieChartData = [pregunta.nA, pregunta.nB, pregunta.nC];
      if (this.datosGrafico === undefined) {
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

  openDialogFinEncuesta() {
    const dialogFinEncuesta = this.dialog.open(FinEncuestaComponent, {
      width: '40%'
    });

    dialogFinEncuesta.afterClosed().subscribe(result => {
      this.router.navigate(['/component/proyectos']);
    });
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
    console.log('All right!');
    console.log(this.respuestas);

    for (const respuesta of this.respuestas) {
      for (const pregunta of this.preguntas) {
        if (respuesta.pregunta === pregunta.pregunta) {
          if (respuesta.respuestaMarcada === pregunta.respuestaA) {
            pregunta.nA = pregunta.nA + 1;
          } else if (respuesta.respuestaMarcada === pregunta.respuestaB) {
            pregunta.nB = pregunta.nB + 1;
          } else if (respuesta.respuestaMarcada === pregunta.respuestaC) {
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
    this.encuestaService.disableEncuesta(localStorage.getItem('id'),
      localStorage.getItem('email'),
      localStorage.getItem('password'),
      new DisableEncuestaDto(true));
  }

  /*ENVIA UN ARRAY DE PREGUNTAS RESPONDIDAS*/
  enviarPreguntas() {
    console.log('All right!');
    console.log(this.respuestas);

    for (const respuesta of this.respuestas) {
      for (const pregunta of this.preguntas) {
        if (respuesta.pregunta === pregunta.pregunta) {
          if (respuesta.respuestaMarcada === pregunta.respuestaA) {
            pregunta.nA = pregunta.nA + 1;
          } else if (respuesta.respuestaMarcada === pregunta.respuestaB) {
            pregunta.nB = pregunta.nB + 1;
          } else if (respuesta.respuestaMarcada === pregunta.respuestaC) {
            pregunta.nC = pregunta.nC + 1;
          }

          if (this.preguntasRespondidas === undefined) {
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
    // comprobar si no se ha marcado anteriormente, y en su defecto la modifica

    let encontrada = false;
    let i = 0;
    let indice = 0;

    if (this.respuestas === undefined) {

      this.respuestas = [new PreguntaRespondidaDto(pregunta, respuestaMarcada)];

    } else {

      for (const respuestaSelec of this.respuestas) {

        if (respuestaSelec.pregunta === pregunta) {
          console.log('KAJSAHDKJ');
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

  comprobarEncuesta() {
    if (this.respuestas === undefined) {
      return false;
    } else if (this.respuestas.length !== this.preguntas.length) {
      return false;
    } else {
      return true;
    }
  }

  downloadPDF() {
    /**
     * Creamos el documento PDF
     */
    const doc = new jsPDF();
    let i = 10;

    doc.setFontSize(18);
    doc.setFontType('bold');
    doc.text('RESULTADOS ENCUESTA EXPO FP 2019 - SALESIANOS TRIANA', 5, i);
    i = i + 20;

    doc.setFontSize(14);
    for (const p of this.preguntas) {
      doc.setFontType('bold');
      doc.text(p.pregunta, 10, i);
      i = i + 10;


      doc.setFontType('normal');
      doc.text('A - ' + p.respuestaA + ' - ' + p.nA, 15, i);
      i = i + 10;

      doc.text('B - ' + p.respuestaB + ' - ' + p.nB, 15, i);
      i = i + 10;

      if (p.respuestaC != null) {
        doc.text('C - ' + p.respuestaC + ' - ' + p.nC, 15, i);
        i = i + 10;
      }

      i = i + 20;
    }

    doc.save('ExpoFP19.pdf');
  }

  downloadCSV(){
      const options = { 
        fieldSeparator: ',',
        filename: 'ExpoFP19',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Encuesta satisfacción ExpoFP 2019 Salesianos Triana',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };

      var datos = [];

      for(let p of this.preguntas){
        if(datos==undefined){
          datos = [{
            pregunta: p.pregunta,
            respuestaA: p.respuestaA,
            nA: p.nA,
            respuestaB: p.respuestaB,
            nB: p.nB,
            respuestaC: p.respuestaC,
            nC: p.nC
          }]
        } else {
          datos.push({
            pregunta: p.pregunta,
            respuestaA: p.respuestaA,
            nA: p.nA,
            respuestaB: p.respuestaB,
            nB: p.nB,
            respuestaC: p.respuestaC,
            nC: p.nC
          })
        }
      }

      

      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(datos);
  }


}
