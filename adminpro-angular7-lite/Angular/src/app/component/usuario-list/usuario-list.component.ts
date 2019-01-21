import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ListUsuarioService } from '../../services/list-usuario.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ListApiResponse } from '../../interfaces/list-api.interface';
import { ListUsuariosResponse } from '../../interfaces/list-usuarios';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  listaApi: ListApiResponse;
  listaUsuariosRes: ListUsuariosResponse[];
  displayedColumns: string[] = ['userId', 'username', 'email'];
  dataSource: ListUsuariosResponse[];

  constructor(private listUsuarioService: ListUsuarioService, private authService: AuthService,
              public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.listUser();
  }

  listUser() {
    this.listUsuarioService.listUsuarios().subscribe(lista => {
      this.listaApi = lista;
      this.listaUsuariosRes = this.listaApi.rows;
      // this.dataSource = lista;
      console.log(this.listaUsuariosRes);

    }, error => {
      console.error(error);
    });
  }

  /*
  deleteUsuario(element: User) {    
    console.log(element.id);
    
    this.listUsuarioService.deleteUsuario(element).subscribe(resp => {
    
      console.log(resp);
      this.listUsuarioService.refresh();
    }, error => console.error(error)
    );
  }
  */
}
