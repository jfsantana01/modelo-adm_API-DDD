import { IAlterarCliente } from "@modules/cliente/domain/models/IAlterarCliente";
import { ICriarCliente } from "@modules/cliente/domain/models/ICriarCliente";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function validaCriarCliente(req: Request, res: Response, next: NextFunction): void {
  const criarCliente = req.body as ICriarCliente;
  if (!criarCliente.ds_login) throw new AppError("ds_login não pode ser nulo.", 400);
  if (!criarCliente.nm_cliente) throw new AppError("nm_cliente não pode ser nulo.", 400);
  next();
}
export function validaAlterarCliente(req: Request, res: Response, next: NextFunction): void {
  const alterarCliente = req.body as IAlterarCliente;
  if (!alterarCliente.id_cliente) throw new AppError("id_cliente não pode ser nulo.", 400);
  next();
}
