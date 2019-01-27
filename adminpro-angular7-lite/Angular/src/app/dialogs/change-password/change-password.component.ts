import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListUsuarioService } from '../../services/list-usuario.service';
import { NewPassDto } from '../../dto/newpass.dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  newPasswordDto : NewPassDto;
  id: string;
  email: string;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private fb: FormBuilder,
              private userService: ListUsuarioService
              ) { }

  ngOnInit() {
      this.form = this.fb.group ( {
      password:  ['', ( [ Validators.required ] )],
      newpassword: ['' , Validators.compose ( [ Validators.required ] )]  
    } );
  }
  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit() {
    this.id = localStorage.getItem('id');
    console.log(this.id);
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.newPasswordDto = new NewPassDto(this.form.controls['newpassword'].value);                                     
    this.userService.updatePass(this.id, this.email,this.form.controls['password'].value, this.newPasswordDto).subscribe(updatePassRes => {
      this.dialogRef.close();
    })
  }

}
