import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarVersaoService } from "@modules/versao/services/CriarVersaoService";
import { AlterarVersaoService } from "@modules/versao/services/AlterarVersaoService";
import { RemoverVersaoService } from "@modules/versao/services/RemoverVersaoService";
import { ListarVersaoService } from "@modules/versao/services/ListarVersaoService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarVersao } from "@modules/versao/domain/models/ICriarVersao";
import { IAlterarVersao } from "@modules/versao/domain/models/IAlterarVersao";

export class VersaoController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const nm_versao = req.query.nm_versao as string;
    const listarVersao = container.resolve(ListarVersaoService);
    const versoes = await listarVersao.execute({ nm_versao });

    return res.json(sucesso(versoes));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const versao: ICriarVersao = {
      nm_versao: req.body.nm_versao,
      ds_versao: req.body.ds_versao,
    };

    const criarVersao = container.resolve(CriarVersaoService);

    const versaoResponse = await criarVersao.execute(versao);

    return res.json(sucesso([versaoResponse], "Versão Criada"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const versao: IAlterarVersao = {
      id_versao: req.body.id_versao,
      nm_versao: req.body.nm_versao,
      ds_versao: req.body.ds_versao,
    };

    const alterarVersao = container.resolve(AlterarVersaoService);

    const versaoResponse = await alterarVersao.execute(versao);

    return res.json(sucesso([versaoResponse], "Versão Alterada"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_versao } = req.body;

    const deleteVersao = container.resolve(RemoverVersaoService);

    await deleteVersao.execute({ id_versao });

    return res.json(sucesso([], "Versão Removida"));
  }
}
