import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarParametroService } from "@modules/parametro/services/CriarParametroService";
import { AlterarParametroService } from "@modules/parametro/services/AlterarParametroService";
import { RemoverParametroService } from "@modules/parametro/services/RemoverParametroService";
import { ListarParametroService } from "@modules/parametro/services/ListarParametroService";
import { sucesso } from "@shared/responses/AppResponse";
import { ICriarParametro } from "@modules/parametro/domain/models/ICriarParametro";
import { IAlterarParametro } from "@modules/parametro/domain/models/IAlterarParametro";

export class ParametroController {
  public async listar(req: Request, res: Response): Promise<Response> {
    const nm_parametro = req.query.nm_parametro as string;
    const listarParametro = container.resolve(ListarParametroService);
    const parametros = await listarParametro.execute({ nm_parametro });

    return res.json(sucesso(parametros));
  }

  public async criar(req: Request, res: Response): Promise<Response> {
    const parametro: ICriarParametro = {
      nm_parametro: req.body.nm_parametro,
      vl_parametro1: req.body.vl_parametro1,
      vl_parametro2: req.body.vl_parametro2,
      vl_parametro3: req.body.vl_parametro3,
    };

    const criarParametro = container.resolve(CriarParametroService);

    const parametroResponse = await criarParametro.execute(parametro);

    return res.json(sucesso([parametroResponse], "Parametro Criado"));
  }

  public async alterar(req: Request, res: Response): Promise<Response> {
    const parametro: IAlterarParametro = {
      id_parametro: req.body.id_parametro,
      nm_parametro: req.body.nm_parametro,
      vl_parametro1: req.body.vl_parametro1,
      vl_parametro2: req.body.vl_parametro2,
      vl_parametro3: req.body.vl_parametro3,
    };

    const alterarParametro = container.resolve(AlterarParametroService);

    const parametroResponse = await alterarParametro.execute(parametro);

    return res.json(sucesso([parametroResponse], "Parametro Alterado"));
  }

  public async remover(req: Request, res: Response): Promise<Response> {
    const { id_parametro } = req.body;

    const deleteParametro = container.resolve(RemoverParametroService);

    await deleteParametro.execute({ id_parametro });

    return res.json(sucesso([], "Parametro Removido"));
  }
}
