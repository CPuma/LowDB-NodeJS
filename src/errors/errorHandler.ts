import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

enum EnumStatusError {
  "ServerError" = 500,
  "NotFound" = 404
}
interface ICustomError {
  ok: boolean;
  status: number;
  name: string;
  message: Array<any> | string;
}

export class CustomError implements ICustomError {
  ok: boolean;
  name: string;
  message: Array<any> | string;
  status: number;

  constructor(status: number, message: any) {
    this.status = status;
    this.message = message;
    this.ok = false;
    this.name = "Error";
  }
}

export const handlingError = (
  err: ErrorRequestHandler | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (!(err instanceof CustomError)) {
    err = new CustomError(500, "Internal error");
  }
  return res.status(err.status).json(err);
};
