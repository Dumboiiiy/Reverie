import type { Request, Response, NextFunction } from "express";
import {AppError} from "../utils/appError";
import {error} from "../utils/envelope";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if(err instanceof AppError){
    return res.status(err.statusCode).json(error(err.message, 'APP_ERROR'));
  }

  console.error("error",err);
  return res.status(500).json(error('Internal Server Error', 'INTERNAL_SERVER_ERROR'));
}