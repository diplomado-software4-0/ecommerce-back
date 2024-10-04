export interface Controller {
	run: (args: unknown[]) => Promise<unknown>;
}