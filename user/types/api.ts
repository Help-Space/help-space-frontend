export interface GetUserResponse {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    birth_date: string;
}

export interface RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
