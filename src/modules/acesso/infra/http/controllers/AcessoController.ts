import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarAcessoService } from "@modules/acesso/services/CriarAcessoService";
import { AlterarAcessoService } from "@modules/acesso/services/AlterarAcessoService";
import { RemoverAcessoService } from "@modules/acesso/services/RemoverAcessoService";
import { ListarAcessoService } from "@modules/acesso/services/ListarAcessoService";
import { ListarAcessoPorPaginacaoService } from "@modules/acesso/services/ListarAcessoPorPaginacaoService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarAcesso } from "@modules/acesso/domain/models/ICriarAcesso";
import { IAlterarAcesso } from "@modules/acesso/domain/models/IAlterarAcesso";
import { IListarAcesso } from "@modules/acesso/domain/models/IListarAcesso";

export class AcessoController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const acesso: IListarAcesso = {
      id_acesso: req.query.id_acesso as string,
      nm_acesso: req.query.nm_acesso as string,
      ds_acesso: req.query.ds_acesso as string,
      perfis: req.query.perfis as string[],
    };
    const listarAcesso = container.resolve(ListarAcessoService);
    const acessoResponse = await listarAcesso.execute(acesso);

    return res.json(sucesso(acessoResponse));
  }
  public async listarPorPaginacao(req: Request, res: Response): Promise<Response> {
    const nm_acesso = req.query.nm_acesso as string;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listarAcesso = container.resolve(ListarAcessoPorPaginacaoService);
    const acessos = await listarAcesso.execute({ nm_acesso, page, limit });

    return res.json(sucesso([acessos]));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const acesso: ICriarAcesso = {
      nm_acesso: req.body.nm_acesso,
      ds_acesso: req.body.ds_acesso,
      in_ativo: req.body.in_ativo,
    };

    const criarAcesso = container.resolve(CriarAcessoService);
    const acessoResponse = await criarAcesso.execute(acesso);

    return res.json(sucesso([acessoResponse], "Acesso Criado"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const acesso: IAlterarAcesso = {
      id_acesso: req.body.id_acesso,
      nm_acesso: req.body.nm_acesso,
      ds_acesso: req.body.ds_acesso,
      in_ativo: req.body.in_ativo,
      perfis: req.body.perfis,
    };

    const alterarAcesso = container.resolve(AlterarAcessoService);
    const acessoResponse = await alterarAcesso.execute(acesso);
    return res.json(sucesso([acessoResponse], "Acesso Alterado"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_acesso } = req.body;

    const deleteAcesso = container.resolve(RemoverAcessoService);

    await deleteAcesso.execute({ id_acesso });

    return res.json(sucesso([], "Acesso Removido"));
  }
}
