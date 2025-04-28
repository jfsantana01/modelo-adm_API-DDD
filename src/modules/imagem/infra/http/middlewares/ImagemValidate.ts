import { IAdicionarTipoImagem } from "@modules/imagem/domain/models/IAdicionarTipoImagem";
import { IAlterarImagem } from "@modules/imagem/domain/models/IAlterarImagem";
import { ICriarImagem } from "@modules/imagem/domain/models/ICriarImagem";
import { IRemoverImagem } from "@modules/imagem/domain/models/IRemoverImagem";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function validaCriarImagem(req: Request, res: Response, next: NextFunction): void {
  const criarImagem = req.body as ICriarImagem;
  if (!req.file) throw new AppError("File 'imagem' não informado", 400);
 // if (!criarImagem.nm_imagem) throw new AppError("nm_imagem não pode ser nulo.", 400);
  next();
}
export function validaAlterarImagem(req: Request, res: Response, next: NextFunction): void {
  const alterarImagem = req.body as IAlterarImagem;
  if (!alterarImagem.id_imagem) throw new AppError("id_imagem não pode ser nulo.", 400);
  next();
}
export function validaRemoverImagem(req: Request, res: Response, next: NextFunction): void {
  const alterarImagem = req.body as IRemoverImagem;
  if (!alterarImagem.id_imagem) throw new AppError("id_imagem não pode ser nulo.", 400);
  next();
}
export function validaAdicionarTipoImagem(req: Request, res: Response, next: NextFunction): void {
  const alterarImagem = req.body as IAdicionarTipoImagem;
  if (!alterarImagem.id_imagem) throw new AppError("id_imagem não pode ser nulo.", 400);
  if (!alterarImagem.id_tipoimagem) throw new AppError("id_tipoimagem não pode ser nulo.", 400);
  next();
}
