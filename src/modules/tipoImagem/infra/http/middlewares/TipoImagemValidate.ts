import { IAlterarTipoImagem } from "@modules/tipoImagem/domain/models/IAlterarTipoImagem";
import { ICriarTipoImagem } from "@modules/tipoImagem/domain/models/ICriarTipoImagem";
import { IRemoverTipoImagem } from "@modules/tipoImagem/domain/models/IRemoverTipoImagem";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function validaCriarTipoImagem(req: Request, res: Response, next: NextFunction): void {
  const criarTipoImagem = req.body as ICriarTipoImagem;
  if (!criarTipoImagem.nm_tipoimagem) throw new AppError("nm_tipoimagem não pode ser nulo.", 400);
  next();
}
export function validaAlterarTipoImagem(req: Request, res: Response, next: NextFunction): void {
  const alterarTipoImagem = req.body as IAlterarTipoImagem;
  if (!alterarTipoImagem.id_tipoimagem) throw new AppError("id_tipoimagem não pode ser nulo.", 400);
  next();
}
export function validaRemoverTipoImagem(req: Request, res: Response, next: NextFunction): void {
  const alterarTipoImagem = req.body as IRemoverTipoImagem;
  if (!alterarTipoImagem.id_tipoimagem) throw new AppError("id_tipoimagem não pode ser nulo.", 400);
  next();
}
