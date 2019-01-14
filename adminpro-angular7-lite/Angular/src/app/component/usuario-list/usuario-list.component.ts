import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ListUsuarioService } from '../../services/list-usuario.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'username', 'email'];
  dataSource: User[];

  constructor(private listUsuarioService: ListUsuarioService, private authService: AuthService,
              public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.listUser('Lista de usuarios obtenidas correctamente');
  }

  listUser(mensaje: string) {
    this.listUsuarioService.listUser().subscribe(listUser => {
      this.dataSource = listUser;
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, error =>  {
      this.snackBar.open('Error al obtener usuarios', 'Cerrar', {
        duration: 3000,
      });
    });


  }

  deleteUsuario(element: User) {    
    console.log(element.id);
    
    this.listUsuarioService.deleteUsuario(element).subscribe(resp => {
    
      console.log(resp);
      this.listUsuarioService.refresh();
    }, error => console.error(error)
    );
  }

}