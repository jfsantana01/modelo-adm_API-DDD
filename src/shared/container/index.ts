import { container } from "tsyringe";
import "@shared/providers";

import { IAcessoRepository } from "@modules/acesso/domain/repositories/IAcessoRepository";
import { AcessoRepository } from "@modules/acesso/infra/typeorm/repositories/AcessoRepository";

import { IUsuarioTokenRepository } from "@modules/usuario/domain/repositories/IUsuarioTokenRepository";
import { UsuarioTokenRepository } from "@modules/usuario/infra/typeorm/repositories/UsuarioTokenRepository";

import { IClienteRepository } from "@modules/cliente/domain/repositories/IClienteRepository";
import { ClienteRepository } from "@modules/cliente/infra/typeorm/repositories/ClienteRepository";

import { IUsuarioRepository } from "@modules/usuario/domain/repositories/IUsuarioRepository";
import { UsuarioRepository } from "@modules/usuario/infra/typeorm/repositories/UsuarioRepository";

import { IPerfilRepository } from "@modules/perfil/domain/repositories/IPerfilRepository";
import { PerfilRepository } from "@modules/perfil/infra/typeorm/repositories/PerfilRepository";

import { VersaoRepository } from "@modules/versao/infra/typeorm/repositories/VersaoRepository";
import { IVersaoRepository } from "@modules/versao/domain/repositories/IVersaoRepository";

import { IParametroRepository } from "@modules/parametro/domain/repositories/IParametroRepository";
import { ParametroRepository } from "@modules/parametro/infra/typeorm/repositories/ParametroRepository";

import { ImagemRepository } from "@modules/imagem/infra/typeorm/repositories/ImagemRepository";
import { IImagemRepository } from "@modules/imagem/domain/repositories/IImagemRepository";
import { TipoImagemRepository } from "@modules/tipoImagem/infra/typeorm/repositories/TipoImagemRepository";
import { ITipoImagemRepository } from "@modules/tipoImagem/domain/repositories/ITipoImagemRepository";
import { IProdutoRepository } from "@modules/produto/domain/repositories/IProdutoRepository";
import { ProdutoRepository } from "@modules/produto/infra/typeorm/repositories/ProdutoRepository";

container.registerSingleton<IUsuarioRepository>("UsuarioRepository", UsuarioRepository);
container.registerSingleton<IUsuarioTokenRepository>("UsuarioTokensRepository", UsuarioTokenRepository);
container.registerSingleton<IAcessoRepository>("AcessoRepository", AcessoRepository);
container.registerSingleton<IPerfilRepository>("PerfilRepository", PerfilRepository);
container.registerSingleton<IVersaoRepository>("VersaoRepository", VersaoRepository);
container.registerSingleton<IParametroRepository>("ParametroRepository", ParametroRepository);
container.registerSingleton<IClienteRepository>("ClienteRepository", ClienteRepository);
container.registerSingleton<IImagemRepository>("ImagemRepository", ImagemRepository);
container.registerSingleton<ITipoImagemRepository>("TipoImagemRepository", TipoImagemRepository);
container.registerSingleton<IProdutoRepository>("ProdutoRepository", ProdutoRepository);
