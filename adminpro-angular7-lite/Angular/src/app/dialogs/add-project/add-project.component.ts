import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AddProjectService } from '../../services/add-project.service';
import { ProjectDto } from '../../dto/addpro.dto';
import { MatDialogRef } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Autor } from '../../interfaces/autor.interface'
import { MatChipInputEvent } from '@angular/material/chips'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public form: FormGroup;
  addProjectDto: ProjectDto;
  autores: Autor[]=[
  ];

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder,
    private addProjectService: AddProjectService,
    public dialogRef: MatDialogRef<AddProjectComponent>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      autores: [null, Validators.compose([Validators.required])],
      curso: [null, Validators.compose([Validators.required])],
      img: [null],
      descripcion: [null, Validators.compose([Validators.required])]
    });
  }

  addProject() {
    this.addProjectDto = new ProjectDto(this.form.controls['title'].value,
      this.form.controls['autores'].value,
      this.form.controls['curso'].value,
      this.form.controls['img'].value,
      this.form.controls['descripcion'].value);

    this.addProjectService.addPro(this.addProjectDto).subscribe(proyecto => {
      this.dialogRef.close();
    }, error => {
      console.error(error);

    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.autores.push({nombre: value.trim()});
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
