import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AddProjectService } from '../../services/add-project.service';
import { ProjectDto } from '../../dto/addpro.dto';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  public form: FormGroup;
  addProjectDto: ProjectDto;

  constructor(private fb: FormBuilder,
    private addProjectService: AddProjectService) {
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

    }, error => {
      console.error(error);

    });
  }

}
