import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarUsuarioService } from "@modules/usuario/services/CriarUsuarioService";
import { AlterarUsuarioService } from "@modules/usuario/services/AlterarUsuarioService";

import { sucesso } from "@shared/responses/AppResponse";
import { ListarUsuarioService } from "@modules/usuario/services/ListarUsuarioService";
import { instanceToPlain } from "class-transformer";
import { AdicionarPerfilAoUsuarioService } from "@modules/usuario/services/AdicionarPerfilAoUsuarioService";
import { RemoverPerfilDoUsuarioService } from "@modules/usuario/services/RemoverPerfilDoUsuarioService";
import { IAlterarUsuario } from "@modules/usuario/domain/models/IAlterarUsuario";
import { ICriarUsuario } from "@modules/usuario/domain/models/ICriarUsuario";
import { IListarUsuarios } from "@modules/usuario/domain/models/IListarUsuarios";

export class UsuarioController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const usuarioRequest: IListarUsuarios = {
      id_usuario: req.query.id_usuario as string,
      nm_usuario: req.query.nm_usuario as string,
      ds_login: req.query.ds_login as string,
      perfis: req.query.perfis as string[],
    };

    const listarUsuario = container.resolve(ListarUsuarioService);
    const usuarioResponse = await listarUsuario.execute(usuarioRequest);

    return res.json(sucesso(instanceToPlain(usuarioResponse)));
  }
  public async criar(req: Request, res: Response): Promise<Response> {
    const usuario: ICriarUsuario = {
      nm_usuario: req.body.nm_usuario,
      ds_login: req.body.ds_login,
      ds_senha: req.body.ds_senha,
      in_ativo: req.body.in_ativo,
      perfis: req.body.perfis,
    };

    const criarUsuario = container.resolve(CriarUsuarioService);

    const usuarioResponse = await criarUsuario.execute(usuario);

    return res.json(sucesso([instanceToPlain(usuarioResponse)], "Usuario Criado."));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const usuario: IAlterarUsuario = {
      id_usuario: req.body.id_usuario,
      nm_usuario: req.body.nm_usuario,
      ds_senha: req.body.ds_senha,
      in_ativo: req.body.in_ativo,
      perfis: req.body.perfis,
    };

    const alterarUsuario = container.resolve(AlterarUsuarioService);

    const usuarioResponse = await alterarUsuario.execute(usuario);

    return res.json(sucesso([instanceToPlain(usuarioResponse)], "Usuario Alterado."));
  }
  public async adicionarPerfil(req: Request, res: Response): Promise<Response> {
    const { id_usuario, id_perfil } = req.body;

    const adicionarPerfil = container.resolve(AdicionarPerfilAoUsuarioService);

    const usuario = await adicionarPerfil.execute({
      id_usuario,
      id_perfil,
    });

    return res.json(sucesso([instanceToPlain(usuario)], "Perfil Adicionado."));
  }
  public async removerPerfil(req: Request, res: Response): Promise<Response> {
    const { id_usuario, id_perfil } = req.body;

    const removerPerfil = container.resolve(RemoverPerfilDoUsuarioService);

    await removerPerfil.execute({
      id_usuario,
      id_perfil,
    });

    return res.json(sucesso([], "Perfil Removido."));
  }
}
