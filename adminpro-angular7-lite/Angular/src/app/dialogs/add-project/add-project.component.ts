import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AddProjectService } from '../../services/add-project.service';
import { ProjectDto } from '../../dto/addpro.dto';
import { MatDialogRef } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Autor } from '../../interfaces/autor.interface'
import { MatChipInputEvent } from '@angular/material/chips'
import { UploadImageDto } from '../../dto/uploadimage.dto';
import { UploadImageImgurService } from '../../services/upload-image-imgur.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DOC_ORIENTATION } from 'ngx-image-compress/lib/image-compress';
// const j = require('jquery');
var ImagenB64: File = null;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public form: FormGroup;
  addProjectDto: ProjectDto;
  uploadImageDto: UploadImageDto;
  autores: Autor[] = [
  ];
  urlImagen: any;
  imgResultBeforeCompress = ImagenB64;
  imgResultAfterCompress;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
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
      descripcion: [null, Validators.compose([Validators.required])]
    });
  }
  foto64() {
    const Image: any = document.getElementById('fotoInput');


    if (Image.files && Image.files[0]) {
      var visor = new FileReader();
      visor.onload = function (e) {
        // document.getElementById('visorArchivo').innerHTML = 
        // '<embed src="'+e.target.result+'" width="500" height="375" />';
        ImagenB64 = Image.files[0];
      };

      visor.readAsDataURL(Image.files[0]);
    }

    this.uploadImageDto = new UploadImageDto(ImagenB64);

    this.uploadImageImgurService.UploadImage(this.uploadImageDto).subscribe(imagen => {

      this.urlImagen = imagen.data.link;
    }, err => {
      console.log('nanai');

      console.log(err);
    });
  }
  compressFile() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.urlImagen = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
    });
  }

  async addProject() {

    await this.newMethod();

    await this.addProjectService.addPro(this.addProjectDto).subscribe(proyecto => {
      this.dialogRef.close();
    }, error => {
      console.error(error);

    });
  }

  private newMethod() {
    // tslint:disable-next-line:max-line-length
    this.addProjectDto = new ProjectDto(this.form.controls['title'].value, this.form.controls['autores'].value, this.form.controls['curso'].value, this.imgResultAfterCompress, this.form.controls['descripcion'].value);
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
