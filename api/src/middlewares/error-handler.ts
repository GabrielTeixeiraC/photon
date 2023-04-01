
import { QueryError } from '../../errors/QueryError';
import { statusCodes } from '../../utils/constants/status-codes';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  const message = error.message;
  let status = statusCodes.INTERNAL_SERVER_ERROR;

  if (error instanceof QueryError) {
    status = statusCodes.BAD_REQUEST;
  }

  console.log(error);
  res.status(status).json(message);
}