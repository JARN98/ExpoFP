import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { ListUsuarioService } from '../../services/list-usuario.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
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
  displayedColumns: string[] = ['username', 'email', 'acciones'];
  dataSource = new MatTableDataSource<ListUsuariosResponse[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private listUsuarioService: ListUsuarioService, private authService: AuthService,
    public snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.listUser();
  }

  listUser() {
    this.listUsuarioService.listUsuarios().subscribe(lista => {
      this.listaApi = lista;
      this.listaUsuariosRes = this.listaApi.rows;
      this.dataSource = new MatTableDataSource<ListUsuariosResponse[]>(this.listaApi.rows);
      this.dataSource.paginator = this.paginator;
      // this.dataSource = lista;
      console.log(this.listaUsuariosRes);

    }, error => {
      console.error(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUsuario(element: User) {
    console.log(element.id);

    this.listUsuarioService.deleteUsuario(element).subscribe(resp => {

      console.log(resp);
      this.listUser();
    }, error => console.error(error)
    );
  }

}
