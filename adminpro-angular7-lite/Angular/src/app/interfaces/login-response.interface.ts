export interface LoginResponse {
    token: string;
    user: User;
}

export interface User {
    name: string;
    picture: string;
    email: string;
    role: string;
    
}
