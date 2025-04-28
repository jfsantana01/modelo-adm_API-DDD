import { Request, Response, NextFunction } from "express";
import AppError, { CONFLICT, INTERNAL_SERVER_ERROR } from "./AppError";
import { QueryFailedError } from "typeorm";
import { conflito, erro } from "@shared/responses/AppResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
  // console.error(error); // Log do erro no console para depuração
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  }
  if (error instanceof QueryFailedError) {
    const driverError = error.driverError as { code?: string; detail?: string };
    if (driverError.code === "23505") {
      return res
        .status(CONFLICT)
        .send(conflito("Conflito: Já existe um registro com os mesmos dados.", [driverError.detail]));
    }
    return res.status(400).json({
      statusCode: 400,
      message: driverError.detail || error.message,
      // details: driverError.detail || error.message,
    });
  }
  console.error(error); // Log do erro no console para depuração

  return res.status(INTERNAL_SERVER_ERROR).send(erro());
};
