import { Router } from "express";


export class AppRouter {
    constructor(private readonly _router: Router) { }

    public run(): void {
        const router = Router();
    }
}