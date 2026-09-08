import type { Request, Response, NextFunction } from "express";
import {error} from "../utils/envelope";

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).json(error(`Route ${req.method} not found`));
}

