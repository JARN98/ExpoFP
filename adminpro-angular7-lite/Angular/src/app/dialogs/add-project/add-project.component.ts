import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddProjectService } from '../../services/add-project.service';
import { ProjectDto } from '../../dto/addpro.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Autor } from '../../interfaces/autor.interface';
import { MatChipInputEvent } from '@angular/material/chips';
import { UploadImageDto } from '../../dto/uploadimage.dto';
import { UploadImageImgurService } from '../../services/upload-image-imgur.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { UploadImageDetailsDto } from '../../dto/uploadimagesdetails.dto';
import { AuthService } from '../../services/auth.service';
import { OneProjectService } from '../../services/one-project.service';
import { EditProjectService } from '../../services/edit-project.service';
import { EditProjectDto } from '../../dto/editpro.dto';
const jwtDecode = require('jwt-decode');

// const j = require('jquery');
let ImagenB64: File = null;


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public form: FormGroup;
  addProjectDto: ProjectDto;
  uploadImageDto: UploadImageDto;
  uploadImageDetailsDto: UploadImageDetailsDto;

  urlImagenes: any;
  autores: Autor[] = [
  ];
  owners: String[];
  urlImagen: any;
  dtoImagenUpload: UploadImageDto;
  editProjectDto: EditProjectDto;
  loading: Boolean;
  admin: boolean;
  edit: boolean;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
    private addProjectService: AddProjectService,
    private uploadImageImgurService: UploadImageImgurService,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    private loginService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private oneProjectService: OneProjectService,
    private editProjectService: EditProjectService) {
  }

  ngOnInit() {
    this.loading = false;
    console.log(this.data.proyecto);

    if (this.data.proyecto === undefined) {
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])],
        autores: [null],
        curso: [null, Validators.compose([Validators.required])],
        img: [null],
        imagenes: [null],
        descripcion: [null, Validators.compose([Validators.required])]
      });
      this.edit = false;
    } else {
      this.getOneProject(this.data.proyecto);
      this.edit = true;
    }
    this.admin = this.loginService.isAdmin();
  }

  getOneProject(id) {
    this.oneProjectService.getOneProjectBH(id).subscribe(proyecto => {
      this.data.proyecto = proyecto;
      this.form = this.fb.group({
        title: [this.data.proyecto.nombre, Validators.compose([Validators.required])],
        autores: [null],
        curso: [this.data.proyecto.curso, Validators.compose([Validators.required])],
        img: [null],
        imagenes: [null],
        descripcion: [this.data.proyecto.descripcion, Validators.compose([Validators.required])]
      });
      this.autores = this.data.proyecto.autores;
      console.log(this.data.proyecto.autores);
    }, err => {
      console.log(err);
    });
  }

  foto64() {
    const Image: any = document.getElementById('fotoInput');

    if (Image.files && Image.files[0]) {
      const visor = new FileReader();
      visor.onload = function () {
        ImagenB64 = Image.files[0];
      };
      visor.readAsDataURL(Image.files[0]);
      this.uploadImageDto = new UploadImageDto(Image.files[0]);
    }
    const decoded = jwtDecode(localStorage.getItem('token'));
    console.log(decoded);


  }

  fotos64() {
    this.uploadImageDetailsDto = null;
    const Image: any = document.getElementById('fotosInput');


    // console.log(this.form.get('imagenes') as FormArray);
    if (Image.files && Image.files[0]) {
      const visor = new FileReader();
      visor.onload = function () {
        // ImagenesB64 = Image.files;
      };

      this.uploadImageDetailsDto = new UploadImageDetailsDto();

      this.uploadImageDetailsDto.image = Image.files;
    }
  }

  addProject() {

    this.owners = [];


    this.uploadImageImgurService.UploadImage(this.uploadImageDto).subscribe(imagen => {
      this.loading = true;

      for (let a of this.autores) {
        if (this.owners === undefined) {
          this.owners = [a.nombre];
        } else {
          this.owners.push(a.nombre);
        }
      }

      this.urlImagen = imagen.data.link;
      if (this.uploadImageDetailsDto.image != null) {
        for (let index = 0; index < this.uploadImageDetailsDto.image.length; index++) {
          this.dtoImagenUpload = new UploadImageDto(this.uploadImageDetailsDto.image[index]);
          this.uploadImageImgurService.UploadImage(this.dtoImagenUpload).subscribe(img => {
            if (this.urlImagenes === undefined) {
              this.urlImagenes = [img.data.link];
            } else {
              this.urlImagenes.push(img.data.link);
            }

            const num = this.uploadImageDetailsDto.image.length - 1;

            if (index === num) {
              // tslint:disable-next-line:max-line-length
              this.addProjectDto = new ProjectDto(this.form.controls['title'].value, this.owners, this.form.controls['curso'].value, this.urlImagen, this.form.controls['descripcion'].value, this.urlImagenes);

              this.addProjectService.addPro(this.addProjectDto).subscribe(() => {
                this.dialogRef.close();
              }, error => {
                console.error(error);
              });
            }

          }, err => {
            console.log(err);
          });
        }

      } else {
        // tslint:disable-next-line:max-line-length
        this.addProjectDto = new ProjectDto(this.form.controls['title'].value, this.owners, this.form.controls['curso'].value, this.urlImagen, this.form.controls['descripcion'].value, this.urlImagenes);
        this.addProjectService.addPro(this.addProjectDto).subscribe(() => {
          this.dialogRef.close();
        }, error => {
          console.error(error);
        });
      }


    }, err => {
      console.log('nanai');

      console.log(err);
    });
    this.loading = false;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.autores.push({ nombre: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  editProject(id) {

    if (this.uploadImageDto === undefined) {

      this.editProjectDto = new EditProjectDto(this.form.controls['title'].value,
        this.owners,
        this.form.controls['curso'].value,
        this.form.controls['descripcion'].value,
        this.urlImagen);


      this.editProjectService.editPro(this.editProjectDto, localStorage.getItem('idDeProyecto')).subscribe(proyecto => {
        this.dialogRef.close();
      }, err => {
        console.log(err);
      });
    } else {
      this.uploadImageImgurService.UploadImage(this.uploadImageDto).subscribe(imagen => {


        this.urlImagen = imagen.data.link;

        this.editProjectDto = new EditProjectDto(this.form.controls['title'].value,
          this.owners,
          this.form.controls['curso'].value,
          this.form.controls['descripcion'].value,
          this.urlImagen);


        this.editProjectService.editPro(this.editProjectDto, localStorage.getItem('idDeProyecto')).subscribe(proyecto => {
          this.dialogRef.close();
        }, err => {
          console.log(err);
        });
      }, err => console.log(err));
    }

  }

  remove(autor: Autor): void {
    const index = this.autores.indexOf(autor);

    if (index >= 0) {
      this.autores.splice(index, 1);
    }
  }
}
