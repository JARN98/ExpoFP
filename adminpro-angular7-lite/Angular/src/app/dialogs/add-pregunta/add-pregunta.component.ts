import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreguntaDto } from '../../dto/addPregunta.dto';
import { EncuestaService } from '../../services/encuesta.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {

  public form: FormGroup;
  addPreguntaDto: PreguntaDto;

  constructor(private fb: FormBuilder,
    private encuestaService: EncuestaService,
    public dialogRef: MatDialogRef<AddPreguntaComponent>) { }

  ngOnInit() {

    this.form = this.fb.group({
      pregunta: [null, Validators.compose([Validators.required])],
      respuestaA: [null, Validators.compose([Validators.required])],
      respuestaB: [null, Validators.compose([Validators.required])],
      respuestaC: [null]
    })
  }

  addPregunta(){
    this.addPreguntaDto = new PreguntaDto(this.form.controls['pregunta'].value,
      this.form.controls['respuestaA'].value, this.form.controls['respuestaB'].value,
      this.form.controls['respuestaC'].value);
              
    this.encuestaService.addPregunta(this.addPreguntaDto).subscribe(pregunta => {
      this.dialogRef.close();
    }, error => {
      console.error(error);
    });
  }

}
