export interface User {
    email: String;
    password: String;
}

export interface SignUp extends User {
    firstname: String,
    lastname: String
}