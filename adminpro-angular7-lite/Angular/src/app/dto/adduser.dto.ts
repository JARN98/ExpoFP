export class UserDto {
    email: String;
    password: String;
    name: String;
    picture: String;
    role: String;
    access_token: String = 'oDUV7u5ZzJIc81W7SR1eqFXD0qNCbPWp';

    constructor(email: String, password: String, name: String, picture: String, role: String) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.picture = picture;
        this.role = role;
    }
}