import {
    ErrorResponse,
    Message,
    Responses,
    SuccessResponse,
    SuccessResponseWithData,
    ValidationErrorResponse,
} from "./responses";

export const BACKEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

export const fetchApi = async <ResponseData = Message>(
    path: string,
    body?: any,
    options?: RequestInit
): Promise<ResponseData> => {
    if (body) {
        options = { ...options, body: JSON.stringify(body) };
    }
    let response;
    try {
        response = await fetch(BACKEND_URL + path, options);
    } catch {
        throw new Error("Coś poszło nie tak");
    }
    let parsedResponse: Responses<ResponseData>;
    try {
        parsedResponse = await response.json();
    } catch {
        throw new Error("Problem z parsowaniem odpowiedzi z serwera");
    }
    if (parsedResponse.isError) {
        if ((parsedResponse as ValidationErrorResponse).fields) {
            throw (parsedResponse as ValidationErrorResponse).fields;
        }
        throw new Error((parsedResponse as ErrorResponse).message);
    }
    if ((parsedResponse as SuccessResponse).message) {
        return (parsedResponse as SuccessResponse).message as ResponseData;
    }
    return (parsedResponse as SuccessResponseWithData<ResponseData>).data;
};
