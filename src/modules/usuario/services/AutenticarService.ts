import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";
import { IUsuarioAutenticado } from "../domain/models/IUsuarioAutenticado";
import { IUsuarioRepository } from "../domain/repositories/IUsuarioRepository";
import { IHashProvider } from "../../../shared/providers/hashProvider/models/IHashPovider";
import { IAutenticar } from "../domain/models/IAutenticar";
import { codificarToken } from "@shared/token/jsonwebtoken";
import { instanceToPlain } from "class-transformer";
@injectable()
export class AutenticarService {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository: IUsuarioRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute(usuarioAutenticar: IAutenticar): Promise<IUsuarioAutenticado> {
    const usuario = await this.usuarioRepository.buscarPorLogin(usuarioAutenticar.ds_login);

    if (!usuario) {
      throw new AppError("Usuário ou Senha Inválido.", 401);
    }
    if (!usuario.in_ativo) {
      throw new AppError("Usuário Desativado.", 401);
    }

    const ds_senhaConfirmed = await this.hashProvider.compareHash(usuarioAutenticar.ds_senha, usuario.ds_senha);

    if (!ds_senhaConfirmed) {
      throw new AppError("Usuário ou Senha Inválido.", 401);
    }
    if (!authConfig.jwt.secret) {
      throw new AppError("JWT SECRET não informado..", 400);
    }
    if (!authConfig.jwt.expiresIn) {
      throw new AppError("JWT EXPIRE_IN não informado.", 400);
    }
    let acessosFlat: string[] = [];
    let perfisFlat: string[] = [];
    if (usuario.perfis) {
      const perfisEncontrados = usuario.perfis.map((perfil) => perfil.nm_perfil).flat();
      perfisFlat = Array.from(new Set(perfisEncontrados));
      // usuario.perfisFlat = perfisFlat;

      const acessosEncontrados = usuario.perfis
        .map((perfil) => (perfil.acessos ? perfil.acessos.map((acesso) => acesso.nm_acesso) : []))
        .flat();
      acessosFlat = Array.from(new Set(acessosEncontrados));
      // usuario.acessosFlat = acessosFlat;
    }

    const payoladToken = {
      id_usuario: usuario.id_usuario,
      acessos: acessosFlat,
    };
    const expiresIn = usuarioAutenticar.in_lembrarsenha ? "2629800" : authConfig.jwt.expiresIn;
    const access_token = codificarToken(instanceToPlain(payoladToken), authConfig.jwt.secret, expiresIn);
    const token = {
      access_token: access_token,
      expires_in: Number(expiresIn),
    };

    const usuarioAutenticado: IUsuarioAutenticado = {
      usuario: {
        id_usuario: usuario.id_usuario,
        ds_login: usuario.ds_login,

        nm_usuario: usuario.nm_usuario,
        perfis: perfisFlat,
        acessos: acessosFlat,
      },
      token: token,
    };

    return usuarioAutenticado;
  }
}
