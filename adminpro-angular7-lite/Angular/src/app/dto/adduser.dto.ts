export class UserDto {
    email: String;
    password: String;
    name: String;
    picture: String;
    role: String;

    constructor(e: String, pw: String, n: String, pt: String, r: String){
        e = this.email;
        pw = this.password;
        n = this.name;
        pt = this.picture
        r = this.role;
    }
}