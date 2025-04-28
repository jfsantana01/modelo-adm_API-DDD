import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarPerfilService } from "@modules/perfil/services/CriarPerfilService";
import { AlterarPerfilService } from "@modules/perfil/services/AlterarPerfilService";
import { RemoverPerfilService } from "@modules/perfil/services/RemoverPerfilService";

import { sucesso } from "@shared/responses/AppResponse";
import { AdicionarAcessoAoPerfilService } from "@modules/perfil/services/AdicionarAcessoAoPerfilService";
import { RemoverAcessoDoPerfilService } from "@modules/perfil/services/RemoverAcessoDoPerfilService";
import { ListarPerfilService } from "@modules/perfil/services/ListarPerfilService";
import { ICriarPerfil } from "@modules/perfil/domain/models/ICriarPerfil";
import { IAlterarPerfil } from "@modules/perfil/domain/models/IAlterarPerfil";
import { IListarPerfil } from "@modules/perfil/domain/models/IListarPerfil";

export class PerfilController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const perfil: IListarPerfil = {
      id_perfil: req.query.id_perfil as string,
      nm_perfil: req.query.nm_perfil as string,
      ds_perfil: req.query.ds_perfil as string,
      acessos: req.query.acessos as string[],
    };

    const listarPerfil = container.resolve(ListarPerfilService);
    const perfilResponse = await listarPerfil.execute(perfil);

    return res.json(sucesso(perfilResponse));
  }
  public async criar(req: Request, res: Response): Promise<Response> {
    const perfil: ICriarPerfil = {
      nm_perfil: req.body.nm_perfil,
      ds_perfil: req.body.ds_perfil,
      in_ativo: req.body.in_ativo,
      acessos: req.body.acessos,
    };

    const criarPerfil = container.resolve(CriarPerfilService);

    const perfilResponse = await criarPerfil.execute(perfil);

    return res.json(sucesso([perfilResponse], "Perfil Criado"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const perfil: IAlterarPerfil = {
      id_perfil: req.body.id_perfil,
      nm_perfil: req.body.nm_perfil,
      ds_perfil: req.body.ds_perfil,
      in_ativo: req.body.in_ativo,
      acessos: req.body.acessos,
    };

    const alterarPerfil = container.resolve(AlterarPerfilService);

    const perfilResponse = await alterarPerfil.execute(perfil);

    return res.json(sucesso([perfilResponse], "Perfil Alterado"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_perfil } = req.body;

    const deletePerfil = container.resolve(RemoverPerfilService);

    await deletePerfil.execute({ id_perfil });

    return res.json(sucesso([], "Perfil Removido"));
  }
  public async adicionarAcesso(req: Request, res: Response): Promise<Response> {
    const { id_acesso, id_perfil } = req.body;

    const adicionarAcesso = container.resolve(AdicionarAcessoAoPerfilService);

    const perfil = await adicionarAcesso.execute({
      id_acesso,
      id_perfil,
    });

    return res.json(sucesso([perfil], "Acesso Adicionado."));
  }
  public async removerAcesso(req: Request, res: Response): Promise<Response> {
    const { id_acesso, id_perfil } = req.body;

    const removerAcesso = container.resolve(RemoverAcessoDoPerfilService);

    const perfil = await removerAcesso.execute({
      id_acesso,
      id_perfil,
    });

    return res.json(sucesso([perfil], "Acesso Removido."));
  }
}
