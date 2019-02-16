import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { Proyect } from '../../models/proyect';
import { OneProjectService } from '../../services/one-project.service';

import { from } from 'rxjs';
import { AddComentarioService } from '../../services/add-comentario.service';
import { ComentarioDto } from '../../dto/addcometario.dto';
import { VerComentsService } from '../../services/ver-coments.service';
import { AuthService } from '../../services/auth.service';
import { DeleteComentarioService } from '../../services/delete-comentario.service';
import { MatDialog } from '@angular/material';
import { EditPhotosComponent } from '../../dialogs/edit-photos/edit-photos.component';

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
      /deep/ .carousel-control-prev {
        background-color: black;
      }
      /deep/ .carousel-control-next {
        background-color: black;
      }

      .card-body{
        height: 100%;
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
  autor: string;
  contenido = '';
  valoracion: number;
  valido: boolean;
  imagenAutor: string;
  listaImagenes: String[];
  ultimosComentarios: any;
  masComentarios: boolean;
  esMio: String;
  admin: boolean;
  user: boolean;
  valoracionMedia: number;

  comentarioForm: FormGroup;


  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  constructor(config: NgbCarouselConfig,
    private oneProjectService: OneProjectService,
    private addComentarioService: AddComentarioService,
    private verComentsService: VerComentsService,
    private deleteComentarioService: DeleteComentarioService,
    private authService: AuthService,
    public dialog: MatDialog, private fb: FormBuilder) {

    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;

    this.comentarioForm = this.fb.group({
      contenido: [null, Validators.compose([Validators.required])]
    });
    // console.log(this._route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    this.getOneProject();
    this.admin = this.authService.isAdmin();
    this.user = this.authService.isUser();
  }

  esMioElComentario(autor) {

    if (this.authService.getTokenDecode().id === autor && this.authService.getTokenDecode().role !== 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getOneProject() {
    this.masComentarios = true;
    this.oneProjectService.getOneProject().subscribe(proyecto => {
      this.proyect = proyecto;
      this.listaImagenes = proyecto.imagenesDetalladas;
      this.ultimosComentarios = proyecto.ultimosComentarios.reverse();
      this.proyect.valoracionMedia = parseFloat(this.proyect.valoracionMedia).toFixed(2);
    }, err => {
      console.log(err);
    });
  }

  openDialogEditPhoto() {
    const dialogoAddRec = this.dialog.open(EditPhotosComponent, {
      width: '80%',
      height: '80%',
      data: { proyecto: this.proyect }
    });

    dialogoAddRec.afterClosed().subscribe(result => {
      this.getOneProject();
    });

  }

  addComentario() {
    console.log(this.contenido);
    // const conteni = document.getElementById('exampleInputPassword1').value;
    const comentarioDto = new ComentarioDto(this.proyect.id, this.authService.getTokenDecode().id, this.contenido, this.valoracion);
    console.log(comentarioDto);

    this.addComentarioService.createComentario(comentarioDto).subscribe(
      comentario => {
        console.log('hola');
        this.getOneProject();
        this.contenido = '';
        this.valoracion = 0;
      });

  }

  verTodosComentarios() {
    this.masComentarios = false;
    this.verComentsService.verComents(localStorage.getItem('idDeProyecto')).subscribe(comentarios => {
      this.ultimosComentarios = comentarios.reverse();
    }, err => {
      console.log(err);

    });
  }

  deleteComentario(id: string) {
    this.deleteComentarioService.deleteComentario(id).subscribe(result => {
      this.getOneProject();
    }, error => {
      console.error(error);
    });
  }

  deleteComentarioUser(autor: string) {
    this.deleteComentarioService.deleteComentarioUser(autor, this.authService.getTokenDecode().id).subscribe(result => {
      console.log('hola');

      this.getOneProject();
    }, error => {
      console.error(error);
      this.getOneProject();
    });
  }

  deleteUltimoComentario(autor: String, contenido: String) {
    this.deleteComentarioService.deleteUltimoComentario(autor, contenido).subscribe(result => {
      console.log('EYYY');
      this.getOneProject();
    }, error => {
      console.error(error);
    });
  }


  deleteUltimoComentarioUser(autor: String, contenido: String) {
    this.deleteComentarioService.deleteUltimoComentarioUser(autor, contenido).subscribe(result => {
      console.log('EYYY');
      this.getOneProject();
    }, error => {
      console.error(error);
    });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}



