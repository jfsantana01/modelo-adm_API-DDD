import { IAdicionarImagemAoProduto } from "@modules/produto/domain/models/IAdicionarImagemAoProduto";
import { IAlterarProduto } from "@modules/produto/domain/models/IAlterarProduto";
import { ICriarProduto } from "@modules/produto/domain/models/ICriarProduto";
import { IRemoverImagemDoProduto } from "@modules/produto/domain/models/IRemoverImagemDoProduto";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function validaCriarProduto(req: Request, res: Response, next: NextFunction): void {
  const criarProduto = req.body as ICriarProduto;
  if (!criarProduto.nm_produto) throw new AppError("nm_produto não pode ser nulo.", 400);
  next();
}
export function validaAlterarProduto(req: Request, res: Response, next: NextFunction): void {
  const alterarProduto = req.body as IAlterarProduto;
  if (!alterarProduto.id_produto) throw new AppError("id_produto não pode ser nulo.", 400);
  next();
}
export function validaRemoverProduto(req: Request, res: Response, next: NextFunction): void {
  const alterarProduto = req.body as IAlterarProduto;
  if (!alterarProduto.id_produto) throw new AppError("id_produto não pode ser nulo.", 400);
  next();
}
export function validaAdicionarImagemAoProduto(req: Request, res: Response, next: NextFunction): void {
  const alterarProduto = req.body as IAdicionarImagemAoProduto;
  if (!alterarProduto.id_produto) throw new AppError("id_produto não pode ser nulo.", 400);
  if (!alterarProduto.id_imagem) throw new AppError("id_imagem não pode ser nulo.", 400);
  next();
}
export function validaRemoverImagemDoProduto(req: Request, res: Response, next: NextFunction): void {
  const alterarProduto = req.body as IRemoverImagemDoProduto;
  if (!alterarProduto.id_produto) throw new AppError("id_produto não pode ser nulo.", 400);
  if (!alterarProduto.id_imagem) throw new AppError("id_imagem não pode ser nulo.", 400);
  next();
}
