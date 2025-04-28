import { AutenticarService } from "../../../../src/modules/usuario/services/AutenticarService";
import { FakeUsuarioRepository } from "../../usuario/repositories/fakes/FakeUsuarioRepository";
import authConfig from "./../../../../src/config/auth";
import { codificarToken } from "./../../../../src/shared/token/jsonwebtoken";
import FakeHashProvider from "../providers/hashProvider/fakes/FakeHashProvider";
import AppError from "../../../../src/shared/errors/AppError";

describe("AutenticarService", () => {
  let fakeUsuarioRepository: FakeUsuarioRepository;
  let fakeHashProvider: FakeHashProvider;
  let autenticarService: AutenticarService;

  beforeEach(() => {
    fakeUsuarioRepository = new FakeUsuarioRepository();
    fakeHashProvider = new FakeHashProvider();
    autenticarService = new AutenticarService(fakeUsuarioRepository, fakeHashProvider);
  });

  authConfig.jwt = {
    secret: "secret_key",
    expiresIn: "3600",
  };

  it("Deve ser capaz de autenticar um usuário com credenciais válidas", async () => {
    const senhaHashed = await fakeHashProvider.generateHash("senha_teste");

    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuário Teste",
      ds_login: "login_teste",
      ds_senha: senhaHashed,
      in_ativo: true, // Certifique-se de que o usuário está ativo
      perfis: [],
    });

    const response = await autenticarService.execute({
      ds_login: "login_teste",
      ds_senha: "senha_teste",
    });

    expect(response).toHaveProperty("token");
    expect(response.token).toHaveProperty("access_token");
    expect(response.token.access_token).toBe(
      codificarToken(
        { id_usuario: usuario.id_usuario, acessos: [] },
        authConfig.jwt.secret!,
        authConfig.jwt.expiresIn!,
      ),
    );
  });

  it("Não deve autenticar se o usuário não for encontrado", async () => {
    await expect(
      autenticarService.execute({
        ds_login: "usuario_invalido",
        ds_senha: "senha_invalida",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve autenticar se o usuário estiver desativado", async () => {
    await fakeUsuarioRepository.criar({
      nm_usuario: "Usuário Desativado",
      ds_login: "login_desativado",
      ds_senha: await fakeHashProvider.generateHash("senha_teste"),
      in_ativo: false,
      perfis: [],
    });

    await expect(
      autenticarService.execute({
        ds_login: "login_desativado",
        ds_senha: "senha_teste",
      }),
    ).rejects.toEqual(new AppError("Usuário Desativado.", 401));
  });

  it("Não deve autenticar se a senha estiver incorreta", async () => {
    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuário Teste",
      ds_login: "login_teste",
      ds_senha: await fakeHashProvider.generateHash("senha_correta"),
      in_ativo: true,
      perfis: [],
    });

    await expect(
      autenticarService.execute({
        ds_login: usuario.ds_login,
        ds_senha: "senha_errada",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Deve lançar um erro se JWT secret não estiver configurado", async () => {
    authConfig.jwt.secret = ""; // Simulando a ausência do JWT secret

    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuário Teste",
      ds_login: "login_teste",
      ds_senha: await fakeHashProvider.generateHash("senha_teste"),
      in_ativo: true,
      perfis: [],
    });

    await expect(
      autenticarService.execute({
        ds_login: usuario.ds_login,
        ds_senha: "senha_teste",
      }),
    ).rejects.toEqual(new AppError("JWT SECRET não informado..", 400));
  });

  it("Deve lançar um erro se JWT expiresIn não estiver configurado", async () => {
    authConfig.jwt.secret = "secret_valido";
    authConfig.jwt.expiresIn = ""; // Simulando a ausência do JWT expiresIn

    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuário Teste",
      ds_login: "login_teste",
      ds_senha: await fakeHashProvider.generateHash("senha_teste"),
      in_ativo: true,
      perfis: [],
    });

    await expect(
      autenticarService.execute({
        ds_login: usuario.ds_login,
        ds_senha: "senha_teste",
      }),
    ).rejects.toEqual(new AppError("JWT EXPIRE_IN não informado.", 400));
  });
});
