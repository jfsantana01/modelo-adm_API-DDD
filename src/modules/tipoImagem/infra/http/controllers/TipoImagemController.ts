import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarTipoImagemService } from "@modules/tipoImagem/services/CriarTipoImagemService";
import { AlterarTipoImagemService } from "@modules/tipoImagem/services/AlterarTipoImagemService";
import { RemoverTipoImagemService } from "@modules/tipoImagem/services/RemoverTipoImagemService";
import { ListarTipoImagemService } from "@modules/tipoImagem/services/ListarTipoImagemService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarTipoImagem } from "@modules/tipoImagem/domain/models/ICriarTipoImagem";
import { IAlterarTipoImagem } from "@modules/tipoImagem/domain/models/IAlterarTipoImagem";
import { IListarTipoImagem } from "@modules/tipoImagem/domain/models/IListarTipoImagem";

export class TipoImagemController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const tipoimagem: IListarTipoImagem = {
      id_tipoimagem: req.query.id_tipoimagem as string,
      nm_tipoimagem: req.query.nm_tipoimagem as string,
      ds_tipoimagem: req.query.ds_tipoimagem as string,
      imagens: req.query.imagens as string[],
    };
    const listarTipoImagem = container.resolve(ListarTipoImagemService);
    const tipoimagemResponse = await listarTipoImagem.execute(tipoimagem);

    return res.json(sucesso(tipoimagemResponse));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const tipoimagem: ICriarTipoImagem = {
      nm_tipoimagem: req.body.nm_tipoimagem,
      ds_tipoimagem: req.body.ds_tipoimagem,
      in_ativo: req.body.in_ativo,
    };

    const criarTipoImagem = container.resolve(CriarTipoImagemService);
    const tipoimagemResponse = await criarTipoImagem.execute(tipoimagem);

    return res.json(sucesso([tipoimagemResponse], "TipoImagem Criada"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const tipoimagem: IAlterarTipoImagem = {
      id_tipoimagem: req.body.id_tipoimagem,
      nm_tipoimagem: req.body.nm_tipoimagem,
      ds_tipoimagem: req.body.ds_tipoimagem,
      in_ativo: req.body.in_ativo,
      imagens: req.body.imagens,
    };

    const alterarTipoImagem = container.resolve(AlterarTipoImagemService);
    const tipoimagemResponse = await alterarTipoImagem.execute(tipoimagem);
    return res.json(sucesso([tipoimagemResponse], "TipoImagem Alterado"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_tipoimagem } = req.body;

    const deleteTipoImagem = container.resolve(RemoverTipoImagemService);

    await deleteTipoImagem.execute({ id_tipoimagem });

    return res.json(sucesso([], "TipoImagem Removida"));
  }
}
