import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UploadImageDetailsDto } from '../../dto/uploadimagesdetails.dto';
import { UploadImageImgurService } from '../../services/upload-image-imgur.service';
import { UploadImageDto } from '../../dto/uploadimage.dto';
import { UpdatePhotoService } from '../../services/update-photo.service';

@Component({
  selector: 'app-edit-photos',
  templateUrl: './edit-photos.component.html',
  styleUrls: ['./edit-photos.component.css']
})
export class EditPhotosComponent implements OnInit {
  imagenesProyecto: String[];
  uploadImageDetailsDto: UploadImageDetailsDto;
  dtoImagenUpload: UploadImageDto;
  loading: Boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private uploadImageImgurService: UploadImageImgurService,
    public dialogRef: MatDialogRef<EditPhotosComponent>,
    private updatePhotoService: UpdatePhotoService) { }

  ngOnInit() {
    this.getImagenesProyecto();
    this.loading = false;
  }

  getImagenesProyecto() {
    this.imagenesProyecto = this.data.proyecto.imagenesDetalladas;
  }



  fotos64() {
    this.uploadImageDetailsDto = null;
    const Image: any = document.getElementById('fotosInput');

    if (Image.files && Image.files[0]) {
      const visor = new FileReader();
      visor.onload = function () {
      };

      this.uploadImageDetailsDto = new UploadImageDetailsDto();

      this.uploadImageDetailsDto.image = Image.files;
    }

    for (let index = 0; index < this.uploadImageDetailsDto.image.length; index++) {
      this.dtoImagenUpload = new UploadImageDto(this.uploadImageDetailsDto.image[index]);
      this.uploadImageImgurService.UploadImage(this.dtoImagenUpload).subscribe(img => {
        this.loading = true;
        if (this.imagenesProyecto === undefined) {
          this.imagenesProyecto = [img.data.link];
        } else {
          this.imagenesProyecto.push(img.data.link);
        }

        const num = this.uploadImageDetailsDto.image.length - 1;

        if (index === num) {
          this.loading = false;
        }


      }, err => {
        console.log(err);
      });
    }
    this.getImagenesProyecto();
  }

  eliminarFoto(url) {
    this.imagenesProyecto.forEach(function (element, index, object) {
      if (element === url) {
        object.splice(index, 1);
      }
    });
    console.log(this.imagenesProyecto);
  }


  editar() {
    this.updatePhotoService.editPhotos(this.data.proyecto.id, this.imagenesProyecto).subscribe(proyecto => {
      this.dialogRef.close();
    }, err => {
      console.log(err);
    });
  }

}
