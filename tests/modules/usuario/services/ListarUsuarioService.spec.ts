import { FakeUsuarioRepository } from "../repositories/fakes/FakeUsuarioRepository";
import { ListarUsuarioService } from "../../../../src/modules/usuario/services/ListarUsuarioService";
//import { ListarUsuarioService } from "@/modules/usuario/services/ListarUsuarioService";
describe("ListarUsuarioService", () => {
  let fakeUsuarioRepository: FakeUsuarioRepository;
  let listarUsuarioService: ListarUsuarioService;

  beforeEach(() => {
    fakeUsuarioRepository = new FakeUsuarioRepository();
    listarUsuarioService = new ListarUsuarioService(fakeUsuarioRepository);
  });

  it("Deve ser capaz de listar os usuarios", async () => {
    // Criando usuarios para a lista
    await fakeUsuarioRepository.criar({
      nm_usuario: "Usuario 1",
      ds_login: "login_1",
    });

    await fakeUsuarioRepository.criar({
      nm_usuario: "Usuario 2",
      ds_login: "login_2",
    });

    // Listando os usuarios
    const usuarios = await listarUsuarioService.execute({
      nm_usuario: "Usuario",
    });

    // Verificando se os usuarios foram retornados corretamente
    expect(usuarios).toHaveLength(2);
    expect(usuarios[0].nm_usuario).toBe("Usuario 1");
    expect(usuarios[1].nm_usuario).toBe("Usuario 2");
  });

  it("Não deve ser capaz de listar usuarios quando não houver resultados", async () => {
    // Tentando listar usuarios com nome que não existe
    const usuarios = await listarUsuarioService.execute({
      nm_usuario: "NomeInexistente",
    });

    // Esperando que o resultado seja um array vazio
    expect(usuarios).toHaveLength(0);
  });
});
