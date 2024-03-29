import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response } from "express";
import { Request } from "express-serve-static-core";


@Injectable()
export class AuditMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: Function) {
        console.log('Logging DELETE request IP', req.ip);
        console.log('Logging  DELETE request Path', req.path);
        console.log('Logging DELETE request Headers', req.headers);
        next();
    }

}