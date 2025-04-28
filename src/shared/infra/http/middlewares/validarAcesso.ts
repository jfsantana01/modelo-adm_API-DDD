import AppError from "@shared/errors/AppError";
import { naoAutorizado } from "@shared/responses/AppResponse";
import { Request, Response, NextFunction } from "express";
export function validarAcesso(acesso: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.token;
    if (!token || !token.acessos) {
      // throw new Error("Token inválido ou sem acessos definidos.", 403);
      throw new AppError("Token inválido ou sem acessos definidos.", 403);
    }
    const result = token.acessos.some((el) => el == acesso || el == "ADMINISTRADOR");
    if (result) {
      next();
    } else {
      return res.status(403).json(naoAutorizado("Acesso negado para " + acesso));
    }
  };
}
