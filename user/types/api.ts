export interface GetUserResponse {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    email: string;
    created_at: Date;
}

export interface RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
