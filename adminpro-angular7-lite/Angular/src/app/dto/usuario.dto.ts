export class UsuarioCreateDto {

    username: string;
    email: string;
    password: string;
    img: string;
  
      constructor( username: string, email: string, password: string, img: string) {
         
          this.username = username;
          this.email = email;
          this.password = password;
          this.img = img;
          
      }
  }