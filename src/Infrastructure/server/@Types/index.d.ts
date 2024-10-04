import { TokenData } from "@Domain/Model"
import { Request } from "express"


declare global {
    export namespace Express {
        export interface Request {
            user?: {
                data?: TokenData
            } | null
        }
    }
}