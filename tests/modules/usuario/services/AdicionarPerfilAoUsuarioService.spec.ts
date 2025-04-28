import AppError from "../../../../src/shared/errors/AppError";
import { AdicionarPerfilAoUsuarioService } from "../../../../src/modules/usuario/services/AdicionarPerfilAoUsuarioService";
import { FakePerfilRepository } from "../../perfil/repositories/fakes/FakePerfilRepository";
import { FakeUsuarioRepository } from "../repositories/fakes/FakeUsuarioRepository";

describe("AdicionarPerfilAoUsuarioService", () => {
  let fakePerfilRepository: FakePerfilRepository;
  let fakeUsuarioRepository: FakeUsuarioRepository;
  let adicionarPerfilAoUsuarioService: AdicionarPerfilAoUsuarioService;

  beforeEach(() => {
    fakePerfilRepository = new FakePerfilRepository();
    fakeUsuarioRepository = new FakeUsuarioRepository();
    adicionarPerfilAoUsuarioService = new AdicionarPerfilAoUsuarioService(fakeUsuarioRepository, fakePerfilRepository);
  });

  it("Deve ser capaz de adicionar um perfil a um usuario", async () => {
    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuario Teste",
      ds_login: "login_teste",
    });

    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "Perfil Teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
    });

    const usuarioAtualizado = await adicionarPerfilAoUsuarioService.execute({
      id_perfil: perfil.id_perfil,
      id_usuario: usuario.id_usuario,
    });

    expect(usuarioAtualizado.perfis).toContainEqual(perfil);
  });

  it("Não deve ser capaz de adicionar um perfil a um usuario inexistente", async () => {
    await expect(
      adicionarPerfilAoUsuarioService.execute({
        id_perfil: "perfil_teste",
        id_usuario: "usuario_inexistente",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de adicionar um perfil inexistente a um usuario", async () => {
    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuario Teste",
      ds_login: "login_teste",
    });

    await expect(
      adicionarPerfilAoUsuarioService.execute({
        id_perfil: "perfil_inexistente",
        id_usuario: usuario.id_usuario,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de adicionar um perfil que o usuario já possui", async () => {
    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuario Teste",
      ds_login: "login_teste",
    });

    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "Perfil Teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
    });

    // Adicionando o perfil ao usuario
    usuario.perfis = [];
    usuario.perfis.push(perfil);
    await fakeUsuarioRepository.alterar(usuario);

    // Tentando adicionar o mesmo perfil novamente
    await expect(
      adicionarPerfilAoUsuarioService.execute({
        id_perfil: perfil.id_perfil,
        id_usuario: usuario.id_usuario,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
