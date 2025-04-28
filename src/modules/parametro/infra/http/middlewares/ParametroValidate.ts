import { IAlterarParametro } from "@modules/parametro/domain/models/IAlterarParametro";
import { ICriarParametro } from "@modules/parametro/domain/models/ICriarParametro";
import { IRemoverParametro } from "@modules/parametro/domain/models/IRemoverParametro";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function validaCriarParametro(req: Request, res: Response, next: NextFunction): void {
  const criarParametro = req.body as ICriarParametro;
  if (!criarParametro.nm_parametro) throw new AppError("nm_parametro não pode ser nulo.", 400);
  if (!criarParametro.vl_parametro1) throw new AppError("vl_parametro1 não pode ser nulo.", 400);
  next();
}
export function validaAlterarParametro(req: Request, res: Response, next: NextFunction): void {
  const alterarParametro = req.body as IAlterarParametro;
  if (!alterarParametro.id_parametro) throw new AppError("id_parametro não pode ser nulo.", 400);
  next();
}
export function validaRemoverParametro(req: Request, res: Response, next: NextFunction): void {
  const alterarParametro = req.body as IRemoverParametro;
  if (!alterarParametro.id_parametro) throw new AppError("id_parametro não pode ser nulo.", 400);
  next();
}
