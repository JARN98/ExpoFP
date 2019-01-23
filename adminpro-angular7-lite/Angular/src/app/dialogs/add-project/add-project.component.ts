import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddProjectService } from '../../services/add-project.service';
import { ProjectDto } from '../../dto/addpro.dto';
import { MatDialogRef } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Autor } from '../../interfaces/autor.interface';
import { MatChipInputEvent } from '@angular/material/chips';
import { UploadImageDto } from '../../dto/uploadimage.dto';
import { UploadImageImgurService } from '../../services/upload-image-imgur.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DOC_ORIENTATION } from 'ngx-image-compress/lib/image-compress';
import { UploadImageDetailsDto } from '../../dto/uploadimagesdetails.dto';
import { UrlImagenesDto } from '../../dto/urlimagenes.dto';

// const j = require('jquery');
let ImagenB64: File = null;
let ImagenesB64: File[];


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
  urlImagen: any;
  dtoImagenUpload: UploadImageDto;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
    private addProjectService: AddProjectService,
    private uploadImageImgurService: UploadImageImgurService,
    public dialogRef: MatDialogRef<AddProjectComponent>,
    private cd: ChangeDetectorRef,
    private imageCompress: NgxImageCompressService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      autores: [null],
      curso: [null, Validators.compose([Validators.required])],
      img: [null],
      imagenes: [null],
      descripcion: [null, Validators.compose([Validators.required])]
    });
  }

  foto64() {
    const Image: any = document.getElementById('fotoInput');

    if (Image.files && Image.files[0]) {
      const visor = new FileReader();
      visor.onload = function (e) {
        ImagenB64 = Image.files[0];
      };
      visor.readAsDataURL(Image.files[0]);
      this.uploadImageDto = new UploadImageDto(Image.files[0]);
    }
  }

  fotos64() {
    this.uploadImageDetailsDto = null;
    const Image: any = document.getElementById('fotosInput');


    // console.log(this.form.get('imagenes') as FormArray);
    if (Image.files && Image.files[0]) {
      const visor = new FileReader();
      visor.onload = function (e) {
        // ImagenesB64 = Image.files;
      };

      this.uploadImageDetailsDto = new UploadImageDetailsDto();

      this.uploadImageDetailsDto.image = Image.files;
    }
  }

  addProject() {


    this.uploadImageImgurService.UploadImage(this.uploadImageDto).subscribe(imagen => {


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

            let num = this.uploadImageDetailsDto.image.length - 1;

            if (index === num) {
              this.addProjectDto = new ProjectDto(this.form.controls['title'].value, this.autores, this.form.controls['curso'].value, this.urlImagen, this.form.controls['descripcion'].value, this.urlImagenes);
              
              this.addProjectService.addPro(this.addProjectDto).subscribe(proyecto => {
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
        this.addProjectDto = new ProjectDto(this.form.controls['title'].value, this.autores, this.form.controls['curso'].value, this.urlImagen, this.form.controls['descripcion'].value, this.urlImagenes);
        this.addProjectService.addPro(this.addProjectDto).subscribe(proyecto => {
          this.dialogRef.close();
        }, error => {
          console.error(error);
        });
      }


    }, err => {
      console.log('nanai');

      console.log(err);
    });

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

  remove(autor: Autor): void {
    const index = this.autores.indexOf(autor);

    if (index >= 0) {
      this.autores.splice(index, 1);
    }
  }
}
