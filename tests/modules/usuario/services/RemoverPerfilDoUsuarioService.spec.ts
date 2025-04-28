import AppError from "../../../../src/shared/errors/AppError";
import { RemoverPerfilDoUsuarioService } from "../../../../src/modules/usuario/services/RemoverPerfilDoUsuarioService";
import { FakeUsuarioRepository } from "../../usuario/repositories/fakes/FakeUsuarioRepository";
import { FakePerfilRepository } from "../../perfil/repositories/fakes/FakePerfilRepository";

describe("RemoverPerfilDoUsuarioService", () => {
  let fakeUsuarioRepository: FakeUsuarioRepository;
  let fakePerfilRepository: FakePerfilRepository;
  let removerPerfilDoUsuarioService: RemoverPerfilDoUsuarioService;

  beforeEach(() => {
    fakeUsuarioRepository = new FakeUsuarioRepository();
    fakePerfilRepository = new FakePerfilRepository();
    removerPerfilDoUsuarioService = new RemoverPerfilDoUsuarioService(fakeUsuarioRepository, fakePerfilRepository);
  });

  it("Deve ser capaz de remover um perfil de um usuario", async () => {
    // Criar um perfil
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "perfil_teste",
      ds_perfil: "Perfil TESTE",
    });

    // Criar um usuario com um perfil
    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "usuario_teste",
      ds_login: "login_teste",
      in_ativo: true,
      perfis: [perfil], // Adicionando perfil ao usuario
    });

    // Verificar que o usuario foi criado com o perfil
    expect(usuario.perfis).toHaveLength(1);
    expect(usuario.perfis[0].id_perfil).toEqual(perfil.id_perfil);

    // Remover o perfil do usuario
    const usuarioAtualizado = await removerPerfilDoUsuarioService.execute({
      id_perfil: perfil.id_perfil,
      id_usuario: usuario.id_usuario,
    });

    // Verificar que o perfil foi removido
    expect(usuarioAtualizado.perfis).toHaveLength(0);
  });

  it("Não deve ser capaz de remover um perfil de um usuario inexistente", async () => {
    await expect(
      removerPerfilDoUsuarioService.execute({
        id_perfil: "id_inexistente",
        id_usuario: "id_inexistente",
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificar que lança um erro
  });

  it("Não deve ser capaz de remover um perfil que não existe no usuario", async () => {
    // Criar usuario sem perfis
    const usuario = await fakeUsuarioRepository.criar({
      nm_usuario: "Usuario Teste",
      ds_login: "login_teste",
      in_ativo: true,
      perfis: [],
    });

    // Criar um perfil que não está no usuario
    const perfilInexistente = await fakePerfilRepository.criar({
      nm_perfil: "perfil_inexistente",
      ds_perfil: "Perfil que não existe",
    });

    await expect(
      removerPerfilDoUsuarioService.execute({
        id_perfil: perfilInexistente.id_perfil,
        id_usuario: usuario.id_usuario,
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificar que lança um erro
  });
});
