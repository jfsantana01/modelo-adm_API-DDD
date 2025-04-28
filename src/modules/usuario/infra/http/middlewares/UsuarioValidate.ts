import { IAdicionarPerfilAoUsuario } from "@modules/usuario/domain/models/IAdicionarPerfilAoUsuario";
import { IAlterarAvatarUsuario } from "@modules/usuario/domain/models/IAlterarAvatarUsuario";
import { IAlterarUsuario } from "@modules/usuario/domain/models/IAlterarUsuario";
import { ICriarUsuario } from "@modules/usuario/domain/models/ICriarUsuario";
import { IRemoverUsuario } from "@modules/usuario/domain/models/IRemoverUsuario";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function validaCriarUsuario(req: Request, res: Response, next: NextFunction): void {
  const criarUsuario = req.body as ICriarUsuario;
  if (!criarUsuario.ds_login) throw new AppError("ds_login não pode ser nulo.", 400);
  if (!criarUsuario.nm_usuario) throw new AppError("nm_usuario não pode ser nulo.", 400);
  next();
}
export function validaAlterarUsuario(req: Request, res: Response, next: NextFunction): void {
  const alterarUsuario = req.body as IAlterarUsuario;
  if (!alterarUsuario.id_usuario) throw new AppError("id_usuario não pode ser nulo.", 400);
  next();
}
export function validaRemoverUsuario(req: Request, res: Response, next: NextFunction): void {
  const alterarUsuario = req.body as IRemoverUsuario;
  if (!alterarUsuario.id_usuario) throw new AppError("id_usuario não pode ser nulo.", 400);
  next();
}
export function validaAdicionarPerfilUsuario(req: Request, res: Response, next: NextFunction): void {
  const alterarUsuario = req.body as IAdicionarPerfilAoUsuario;
  if (!alterarUsuario.id_usuario) throw new AppError("id_usuario não pode ser nulo.", 400);
  if (!alterarUsuario.id_perfil) throw new AppError("id_perfil não pode ser nulo.", 400);
  next();
}
export function validaAlterarAvatarUsuario(req: Request, res: Response, next: NextFunction): void {
  const alterarUsuario: IAlterarAvatarUsuario = {
    id_usuario: req.body as string,
    avatarFilename: req.body as string,
  };
  if (!req.file) throw new AppError("File 'avatar' não informado", 400);
  if (!alterarUsuario.id_usuario) throw new AppError("id_usuario não pode ser nulo.", 400);
  next();
}
