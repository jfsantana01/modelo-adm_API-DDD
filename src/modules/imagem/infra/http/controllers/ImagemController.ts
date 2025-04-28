import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarImagemService } from "@modules/imagem/services/CriarImagemService";
import { AlterarImagemService } from "@modules/imagem/services/AlterarImagemService";
import { RemoverImagemService } from "@modules/imagem/services/RemoverImagemService";
import { ListarImagemService } from "@modules/imagem/services/ListarImagemService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarImagem } from "@modules/imagem/domain/models/ICriarImagem";
import { IAlterarImagem } from "@modules/imagem/domain/models/IAlterarImagem";
import { IListarImagem } from "@modules/imagem/domain/models/IListarImagem";
import { instanceToPlain } from "class-transformer";
import { AdicionarTipoImagemService } from "@modules/imagem/services/AdicionarTipoImagemService";
import { IAdicionarTipoImagem } from "@modules/imagem/domain/models/IAdicionarTipoImagem";

export class ImagemController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const imagem: IListarImagem = {
      id_imagem: req.query.id_imagem as string,
      nm_imagem: req.query.nm_imagem as string,
      ds_imagem: req.query.ds_imagem as string,
      ds_imagem2: req.query.ds_imagem2 as string,
      ds_imagem3: req.query.ds_imagem3 as string,
      tiposimagem: req.query.tiposimagem as string[],
    };
    const listarImagem = container.resolve(ListarImagemService);
    const imagemResponse = await listarImagem.execute(imagem);

    return res.json(sucesso(instanceToPlain(imagemResponse)));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const imagem: ICriarImagem = {
      nm_imagem: req.body.nm_imagem,
      ds_imagem: req.body.ds_imagem,
      ds_imagem2: req.body.ds_imagem2,
      ds_imagem3: req.body.ds_imagem3,
      in_ativo: req.body.in_ativo,
      image_filename: req.file!.filename,
      tiposimagens: req.body.tiposimagens,
    };

    const criarImagem = container.resolve(CriarImagemService);
    const imagemResponse = await criarImagem.execute(imagem);

    return res.json(sucesso(instanceToPlain(imagemResponse), "Imagem Criada"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const imagem: IAlterarImagem = {
      id_imagem: req.body.id_imagem,
      nm_imagem: req.body.nm_imagem,
      ds_imagem: req.body.ds_imagem,
      ds_imagem2: req.body.ds_imagem2,
      ds_imagem3: req.body.ds_imagem3,
      in_ativo: req.body.in_ativo,
      tiposimagem: req.body.tiposimagem,
      image_filename: req.file?.filename,
    };

    const alterarImagem = container.resolve(AlterarImagemService);
    const imagemResponse = await alterarImagem.execute(imagem);
    return res.json(sucesso([instanceToPlain(imagemResponse)], "Imagem Alterado"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_imagem } = req.body;

    const deleteImagem = container.resolve(RemoverImagemService);

    await deleteImagem.execute({ id_imagem });

    return res.json(sucesso([], "Imagem Removida"));
  }
  public async adicionarTipoImagem(req: Request, res: Response): Promise<Response> {
    const imagemTipoImagem: IAdicionarTipoImagem = {
      id_imagem: req.body.id_imagem,
      id_tipoimagem: req.body.id_tipoimagem,
    };

    const adicionarTipoImagem = container.resolve(AdicionarTipoImagemService);

    const imagem = await adicionarTipoImagem.execute(imagemTipoImagem);

    return res.json(sucesso([imagem], "TipoImagemAdicionado Adicionado."));
  }
}
