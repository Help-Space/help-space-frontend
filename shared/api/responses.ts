export type Message = string;

export interface ErrorResponse {
    isError: true;
    message: Message;
}

export interface ValidationError {
    msg: string;
    param: string;
}

export interface ValidationErrorResponse {
    isError: true;
    errors: ValidationError[];
}

export interface SuccessResponse {
    isError: false;
    message: Message;
}

export interface SuccessResponseWithData<DataType> {
    isError: false;
    data: DataType;
}

export type Responses<T = any> =
    | ErrorResponse
    | ValidationErrorResponse
    | SuccessResponse
    | SuccessResponseWithData<T>;
