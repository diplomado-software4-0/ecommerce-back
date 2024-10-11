import { StatusCodesHttp } from "@Domain/Enums";
import { AccessDeniedExeption, AuthException, DataNotAvailableException, InvalidFromatExeption, NotFoundDataExeption, NotFoundFileRequestExeption } from "@Domain/Exceptions";
import { ExceptionHandlerBase, ExceptionHandlerResponse, ResponseErrorHttp } from "@Domain/Model";
import { ZodError } from "zod";

export class ExceptionManager implements ExceptionHandlerBase {

    public run = (err: unknown): ExceptionHandlerResponse => {
        const response = new ResponseErrorHttp({
            ok: false,
            message: "Error interno en el servidor"
        });

        console.log(err)

        if (err instanceof ZodError) {
            response.ok = false;
            response.message = "Hubo uno o mas errores de validación";
            response.errors = err.issues.map((issue) => ({ message: issue.message, path: issue.path }));
            return { statusCode: StatusCodesHttp.BadRequest, response }
        }

        if (err instanceof AuthException) {
            response.ok = false;
            response.message = err.message;
            return { statusCode: StatusCodesHttp.Unauthorized, response }
        }

        if (err instanceof AccessDeniedExeption) {
            response.ok = false;
            response.message = err.message;
            return { statusCode: StatusCodesHttp.Unauthorized, response }
        }

        if (err instanceof NotFoundFileRequestExeption) {
            response.ok = false;
            response.message = err.message;
            return { statusCode: StatusCodesHttp.BadRequest, response }
        }
        
        if (err instanceof InvalidFromatExeption) {
            response.ok = false;
            response.message = err.message;
            return { statusCode: StatusCodesHttp.BadRequest, response }
        }

        if (err instanceof NotFoundDataExeption) {
            response.ok = false;
            response.message = err.message;
            return { statusCode: StatusCodesHttp.BadRequest, response }
        }

        if (err instanceof DataNotAvailableException) {
            response.ok = false;
            response.message = err.message;
            return { statusCode: StatusCodesHttp.BadRequest, response }
        }

        return { statusCode: StatusCodesHttp.InternalServerError, response }
    }
}