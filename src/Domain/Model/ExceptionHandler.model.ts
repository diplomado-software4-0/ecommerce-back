import { StatusCodesHttp } from "@Domain/Enums";
import { ResponseErrorHttp, ResponseHttp } from "./Response.model";


export interface ExceptionHandlerResponse {
    statusCode: StatusCodesHttp;
    response: ResponseHttp<unknown> | ResponseErrorHttp<unknown>;
}

export interface ExceptionHandlerBase {
    run: (err: Error) => ExceptionHandlerResponse
}