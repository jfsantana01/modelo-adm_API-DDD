import { FakePerfilRepository } from "../repositories/fakes/FakePerfilRepository";
import { ListarPerfilService } from "../../../../src/modules/perfil/services/ListarPerfilService";

describe("ListarPerfilService", () => {
  let fakePerfilRepository: FakePerfilRepository;
  let listarPerfilService: ListarPerfilService;

  beforeEach(() => {
    fakePerfilRepository = new FakePerfilRepository();
    listarPerfilService = new ListarPerfilService(fakePerfilRepository);
  });

  it("Deve ser capaz de listar os perfis", async () => {
    // Criando perfis para a lista
    await fakePerfilRepository.criar({
      nm_perfil: "PERFIL_1",
      ds_perfil: "Descrição 1",
      in_ativo: true,
    });

    await fakePerfilRepository.criar({
      nm_perfil: "PERFIL_2",
      ds_perfil: "Descrição 2",
      in_ativo: false,
    });

    // Listando os perfis
    const perfis = await listarPerfilService.execute({
      nm_perfil: "Perfil",
    });

    // Verificando se os perfis foram retornados corretamente
    expect(perfis).toHaveLength(2);
    expect(perfis[0].nm_perfil).toBe("PERFIL_1");
    expect(perfis[1].nm_perfil).toBe("PERFIL_2");
  });

  it("Não deve ser capaz de listar perfis quando não houver resultados", async () => {
    // Tentando listar perfis com nome que não existe
    const perfis = await listarPerfilService.execute({
      nm_perfil: "NomeInexistente",
    });

    // Esperando que o resultado seja um array vazio
    expect(perfis).toHaveLength(0);
  });
});
