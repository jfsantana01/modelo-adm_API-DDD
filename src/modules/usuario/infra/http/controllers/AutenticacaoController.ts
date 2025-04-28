import { Request, Response } from "express";
import { container } from "tsyringe";

import { AutenticarService } from "@modules/usuario/services/AutenticarService";
import { sucesso } from "@shared/responses/AppResponse";
import { instanceToPlain } from "class-transformer";
import { IAutenticar } from "@modules/usuario/domain/models/IAutenticar";

export class SessionsController {
  public async autenticar(req: Request, res: Response): Promise<Response> {
    const usuarioAutenticar: IAutenticar = {
      ds_login: req.body.ds_login,
      ds_senha: req.body.ds_senha,
      in_lembrarsenha: req.body.in_lembrarsenha,
    };

    const autenticar = container.resolve(AutenticarService);

    const usuarioAutenticado = await autenticar.execute(usuarioAutenticar);

    return res.json(sucesso([instanceToPlain(usuarioAutenticado)]));
  }
}
