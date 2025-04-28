import { IAdicionarPerfilAoUsuario } from "@modules/usuario/domain/models/IAdicionarPerfilAoUsuario";
import { IAlterarAvatarUsuario } from "@modules/usuario/domain/models/IAlterarAvatarUsuario";
import { IAlterarUsuario } from "@modules/usuario/domain/models/IAlterarUsuario";
import { IAutenticar } from "@modules/usuario/domain/models/IAutenticar";
import { ICriarUsuario } from "@modules/usuario/domain/models/ICriarUsuario";
import { IRemoverUsuario } from "@modules/usuario/domain/models/IRemoverUsuario";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export function autenticarUsuario(req: Request, res: Response, next: NextFunction): void {
  const autenticarUsuario = req.body as IAutenticar;
  if (!autenticarUsuario.ds_login) throw new AppError("ds_login não pode ser nulo.", 400);
  if (!autenticarUsuario.ds_senha) throw new AppError("ds_login não pode ser nulo.", 400);
  next();
}
