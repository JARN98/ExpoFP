import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListProjectsResService } from '../../services/list-projects-res.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DeleteProjectComponent>,
  private projectService: ListProjectsResService) { }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close();
  }

  deleteProyecto() {
    console.log(this.data.id)
    this.projectService.deleteProject(this.data.id).subscribe( () => {

      this.closeDialog()
      
    });
     
  }
 
}
