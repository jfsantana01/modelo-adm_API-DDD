import AppError from "../../../../src/shared/errors/AppError";
import { FakeVersaoRepository } from "../repositories/fakes/FakeVersaoRepository";
import { AlterarVersaoService } from "../../../../src/modules/versao/services/AlterarVersaoService";

describe("AlterarVersaoService", () => {
  let fakeVersaoRepository: FakeVersaoRepository;
  let alterarVersaoService: AlterarVersaoService;

  beforeEach(() => {
    fakeVersaoRepository = new FakeVersaoRepository();
    alterarVersaoService = new AlterarVersaoService(fakeVersaoRepository);
  });

  it("Deve ser capaz de alterar um Versao", async () => {
    // Criando o versao
    const versao = await fakeVersaoRepository.criar({
      nm_versao: "TESTENOME",
      ds_versao: "TESTDESCRICAO",
    });

    // Alterando o versao
    const versaoAlterado = await alterarVersaoService.execute({
      id_versao: versao.id_versao,
      nm_versao: "NOVONOME",
      ds_versao: "NOVADESCRICAO",
    });

    // Verificando se o versao foi alterado
    expect(versaoAlterado.nm_versao).toBe("NOVONOME");
    expect(versaoAlterado.ds_versao).toBe("NOVADESCRICAO");
  });

  it("Não deve ser capaz de alterar um Versao inexistente", async () => {
    // Tentando alterar um versao que não existe
    await expect(
      alterarVersaoService.execute({
        id_versao: "id_inexistente", // ID que não existe
        nm_versao: "NOVONOME",
        ds_versao: "NOVADESCRICAO",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de alterar o nome para um nome de Versao já existente", async () => {
    // Criando dois versoes com nomes diferentes
    await fakeVersaoRepository.criar({
      nm_versao: "PRIMEIRONOME",
      ds_versao: "PRIMEIRADESCRICAO",
    });

    const versao2 = await fakeVersaoRepository.criar({
      nm_versao: "SEGUNDONOME",
      ds_versao: "SEGUNDADESCRICAO",
    });

    // Tentando alterar o nome de `versao1` para o nome de `versao2`
    await expect(
      alterarVersaoService.execute({
        id_versao: versao2.id_versao,
        nm_versao: "PRIMEIRONOME", // Nome já existente
        ds_versao: "SEGUNDADESCRICAO",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
