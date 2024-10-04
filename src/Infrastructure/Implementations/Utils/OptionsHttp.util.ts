import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


export type PersonalizeRequest<T> = Request<PartialAnyable<T>, unknown, T, PartialAnyable<T>>;

class OptionsHttp {

    public static httpArgs = <T>(
        ...args: unknown[]
    ): [PersonalizeRequest<T>, Response, NextFunction] => {
        const data = args[0] as [PersonalizeRequest<T>, Response, NextFunction];
        return data;
    };

    public static httpArgsError = <T>(
        ...args: unknown[]
    ): [ErrorRequestHandler, PersonalizeRequest<T>, Response, NextFunction] => {
        const data = args[0] as [ErrorRequestHandler, PersonalizeRequest<T>, Response, NextFunction];
        return data;
    }
}

export { OptionsHttp }