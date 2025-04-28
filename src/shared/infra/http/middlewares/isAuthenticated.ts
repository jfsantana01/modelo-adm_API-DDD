import { NextFunction, Request, Response } from "express";
import { verify, Secret, JsonWebTokenError } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import { ITokenPayload } from "@shared/domain/models/ITokenPayload";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Não autenticado.", 403);
  }
  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    req.token = decodedToken as ITokenPayload;
    return next();
  } catch (error: unknown) {
    if (error instanceof JsonWebTokenError) {
      const JWTEerror = error as JsonWebTokenError;
      if (JWTEerror.name == "TokenExpiredError") {
        throw new AppError("Token expirado.", 403);
      } else {
        throw new AppError("Erro Interno.", 500);
      }
    }
  }
}
