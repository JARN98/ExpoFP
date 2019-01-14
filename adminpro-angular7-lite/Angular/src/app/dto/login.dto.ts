export class LoginDto {
    email: string;
    password: string;

<<<<<<< HEAD
    constructor(email: string, password: string){
        this.email=email;
        this.password=password;
=======
    constructor(u: string, p: string) {
        this.email = u;
        this.password = p;
>>>>>>> 0d05c0ffcb9cff84e8232f700a5c3cb3feeb372e
    }
}