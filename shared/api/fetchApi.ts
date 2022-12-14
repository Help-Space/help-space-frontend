import {
    ErrorResponse,
    Message,
    Responses,
    SuccessResponse,
    SuccessResponseWithData,
    ValidationErrorResponse,
} from "./responses";

export const BACKEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://api.helpspace.site";

export const fetchApi = async <ResponseData = Message>(
    path: string,
    body?: any,
    options?: RequestInit
): Promise<ResponseData> => {
    if (body) {
        options = {
            ...options,
            body: JSON.stringify(body),
        };
    }
    options = {
        ...options,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
        if ((parsedResponse as ValidationErrorResponse).errors) {
            throw (parsedResponse as ValidationErrorResponse).errors;
        }
        throw new Error((parsedResponse as ErrorResponse).message);
    }
    if ((parsedResponse as SuccessResponse).message) {
        return (parsedResponse as SuccessResponse).message as ResponseData;
    }
    return (parsedResponse as SuccessResponseWithData<ResponseData>).data;
};
