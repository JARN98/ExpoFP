import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { Proyect } from '../../models/proyect';
import { OneProjectService } from '../../services/one-project.service';

@Component({
  selector: 'app-proyecto-detallado',
  templateUrl: './proyecto-detallado.component.html',
  styleUrls: ['./proyecto-detallado.component.css'],
  providers: [NgbCarouselConfig],
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
export class ProyectoDetalladoComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  currentRate = 0;
  currentRate2 = 2;
  selected = 0;
  hovered = 0;
  readonly = false;
  ctrl = new FormControl(null, Validators.required);
  proyect: any;
  listaImagenes:any;
  ultimosComentarios:any;

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  constructor(config: NgbCarouselConfig,
    private oneProjectService: OneProjectService) { 

    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;

    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;

    // console.log(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getOneProject();
  }

  getOneProject() {
    this.oneProjectService.getOneProject().subscribe(proyecto => {
      console.log(proyecto);
      this.proyect = proyecto;
      this.listaImagenes = proyecto.imagenesDetalladas;
      this.ultimosComentarios = proyecto.ultimosComentarios;
    }, err => {
      console.log(err);
    });
  }

}
