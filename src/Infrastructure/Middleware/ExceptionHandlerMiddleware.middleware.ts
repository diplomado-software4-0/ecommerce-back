import { ExceptionHandlerBase } from "@Domain/Model";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export class ExceptionHandlerMiddleware {
	constructor(
		private readonly _exceptionHandler: ExceptionHandlerBase
	) {}

	public run = async (
		err: ErrorRequestHandler,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<unknown> => {
		const exceptionHandler = this._exceptionHandler.run(err as unknown as Error);
		
		return res.status(exceptionHandler.statusCode).json(exceptionHandler.response);
	};
}
