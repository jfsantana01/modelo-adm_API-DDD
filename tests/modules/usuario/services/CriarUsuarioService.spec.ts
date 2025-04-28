import AppError from "../../../../src/shared/errors/AppError";
import { FakeUsuarioRepository } from "../repositories/fakes/FakeUsuarioRepository";
import { CriarUsuarioService } from "../../../../src/modules/usuario/services/CriarUsuarioService";
import FakeHashProvider from "../providers/hashProvider/fakes/FakeHashProvider";

describe("CriarUsuario", () => {
  let fakeUsuarioRepository: FakeUsuarioRepository;
  let fakeHashProvider: FakeHashProvider;
  let criarUsuarioService: CriarUsuarioService;

  beforeEach(() => {
    fakeUsuarioRepository = new FakeUsuarioRepository();
    // fakePerfilRepository = new FakePerfilRepository();
    criarUsuarioService = new CriarUsuarioService(fakeUsuarioRepository, fakeHashProvider);
  });

  it("Deve ser capaz de criar um Usuario", async () => {
    const criarUsuario = new CriarUsuarioService(fakeUsuarioRepository, fakeHashProvider);

    const usuario = await criarUsuario.execute({
      nm_usuario: "TESTENOME",
      ds_login: "teste_login",
    });

    expect(usuario).toHaveProperty("id_usuario");
  });
  it("Não deve ser capaz de criar um Usuario com mesmo nm_usuario", async () => {
    await criarUsuarioService.execute({
      nm_usuario: "TESTENOME",
      ds_login: "teste_login",
    });

    expect(
      criarUsuarioService.execute({
        nm_usuario: "TESTENOME",
        ds_login: "teste_login",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  // it("Deve ser capaz de criar um novo usuário com perfis associados", async () => {
  //   // Mock para a busca de usuário inexistente
  //   jest.spyOn(fakeUsuarioRepository, "buscarPorLogin").mockResolvedValue(null);

  //   // Mock para perfis associados
  //   const mockPerfis = [
  //     { id_perfil: "perfil_1", nm_perfil: "Perfil 1" },
  //     { id_perfil: "perfil_2", nm_perfil: "Perfil 2" },
  //   ];
  //   jest.spyOn(fakePerfilRepository, "listar").mockResolvedValue(mockPerfis);

  //   const criarUsuario = jest.spyOn(fakeUsuarioRepository, "criar");

  //   const usuario = await criarUsuarioService.execute({
  //     ds_login: "usuario_com_perfis",
  //     nm_usuario: "Nome do Usuário",
  //     perfis: ["perfil_1", "perfil_2"], // Perfis associados
  //   });

  //   expect(criarUsuario).toHaveBeenCalledWith({
  //     ds_login: "usuario_com_perfis",
  //     nm_usuario: "Nome do Usuário",
  //     perfis: mockPerfis,
  //   });

  //   expect(usuario).toHaveProperty("id_usuario");
  //   expect(usuario.perfis).toEqual(mockPerfis);
  // });
});
