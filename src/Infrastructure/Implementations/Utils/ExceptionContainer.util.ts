export class ExceptionContainer {
	private static _instance: ExceptionContainer;
	private __errors: Array<ErrorConstructor>;

	private constructor() {
		this.__errors = [];
	}

	public static getInstance(): ExceptionContainer {
		if (!ExceptionContainer._instance) {
			ExceptionContainer._instance = new ExceptionContainer();
		}

		return ExceptionContainer._instance;
	}

	public async loadContainer(): Promise<void> {
		if (this.__errors.length === 0) {
			const lib = await import("@Domain/Exceptions");
			const exceptions = Object.entries(lib).map(([_, error]) => error) as Array<ErrorConstructor>;
			this.__errors = exceptions;
			process.errorContainerInstance = this.__errors;
		}
	}
}
