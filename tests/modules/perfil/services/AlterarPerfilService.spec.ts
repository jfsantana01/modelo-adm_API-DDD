import AppError from "../../../../src/shared/errors/AppError";
import { FakePerfilRepository } from "../repositories/fakes/FakePerfilRepository";
import { AlterarPerfilService } from "../../../../src/modules/perfil/services/AlterarPerfilService";

describe("AlterarPerfilService", () => {
  let fakePerfilRepository: FakePerfilRepository;
  let alterarPerfilService: AlterarPerfilService;

  beforeEach(() => {
    fakePerfilRepository = new FakePerfilRepository();
    alterarPerfilService = new AlterarPerfilService(fakePerfilRepository);
  });

  it("Deve ser capaz de alterar um Perfil", async () => {
    // Criando o perfil
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "TESTENOME",
      ds_perfil: "TESTDESCRICAO",
      in_ativo: true,
    });

    // Alterando o perfil
    const perfilAlterado = await alterarPerfilService.execute({
      id_perfil: perfil.id_perfil,
      nm_perfil: "NOVONOME",
      ds_perfil: "NOVADESCRICAO",
      in_ativo: true,
    });

    // Verificando se o perfil foi alterado
    expect(perfilAlterado.nm_perfil).toBe("NOVONOME");
    expect(perfilAlterado.ds_perfil).toBe("NOVADESCRICAO");
  });

  it("Não deve ser capaz de alterar um Perfil inexistente", async () => {
    // Tentando alterar um perfil que não existe
    await expect(
      alterarPerfilService.execute({
        id_perfil: "id_inexistente", // ID que não existe
        nm_perfil: "NOVONOME",
        ds_perfil: "NOVADESCRICAO",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de alterar o nome  para um nome de Perfil já existente", async () => {
    // Criando dois perfis com nomes diferentes
    await fakePerfilRepository.criar({
      nm_perfil: "PRIMEIRONOME",
      ds_perfil: "PRIMEIRADESCRICAO",
      in_ativo: true,
    });

    const perfil2 = await fakePerfilRepository.criar({
      nm_perfil: "SEGUNDONOME",
      ds_perfil: "SEGUNDADESCRICAO",
      in_ativo: true,
    });

    // Tentando alterar o nome de `perfil1` para o nome de `perfil2`
    await expect(
      alterarPerfilService.execute({
        id_perfil: perfil2.id_perfil,
        nm_perfil: "PRIMEIRONOME", // Nome já existente
        ds_perfil: "SEGUNDADESCRICAO",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
