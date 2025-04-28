import { AlterarAvatarUsuarioServices } from "@modules/usuario/services/AlterarAvatarUsuarioServices";
import { sucesso } from "@shared/responses/AppResponse";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UsuarioAvatarController {
  public async alterar(req: Request, res: Response): Promise<Response> {
    const alterarAvatar = container.resolve(AlterarAvatarUsuarioServices);

    const usuarioResponse = await alterarAvatar.execute({
      id_usuario: req.token!.id_usuario,
      avatarFilename: req.file!.filename,
    });

    return res.json(sucesso([instanceToPlain(usuarioResponse)], "Avatar Usuario Alterado."));
  }
}
