import AppError from "../../../../src/shared/errors/AppError";
import { FakeParametroRepository } from "../repositories/fakes/FakeParametroRepository";
import { AlterarParametroService } from "../../../../src/modules/parametro/services/AlterarParametroService";

describe("AlterarParametroService", () => {
  let fakeParametroRepository: FakeParametroRepository;
  let alterarParametroService: AlterarParametroService;

  beforeEach(() => {
    fakeParametroRepository = new FakeParametroRepository();
    alterarParametroService = new AlterarParametroService(fakeParametroRepository);
  });

  it("Deve ser capaz de alterar um Parametro", async () => {
    // Criando o parametro
    const parametro = await fakeParametroRepository.criar({
      nm_parametro: "TESTENOME",
      vl_parametro1: "TESTDESCRICAO",
    });

    // Alterando o parametro
    const parametroAlterado = await alterarParametroService.execute({
      id_parametro: parametro.id_parametro,
      nm_parametro: "NOVONOME",
      vl_parametro1: "NOVADESCRICAO",
    });

    // Verificando se o parametro foi alterado
    expect(parametroAlterado.nm_parametro).toBe("NOVONOME");
    expect(parametroAlterado.vl_parametro1).toBe("NOVADESCRICAO");
  });

  it("Não deve ser capaz de alterar um Parametro inexistente", async () => {
    // Tentando alterar um parametro que não existe
    await expect(
      alterarParametroService.execute({
        id_parametro: "id_inexistente", // ID que não existe
        nm_parametro: "NOVONOME",
        vl_parametro1: "NOVADESCRICAO",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de alterar o nome para um nome de Parametro já existente", async () => {
    // Criando dois versoes com nomes diferentes
    await fakeParametroRepository.criar({
      nm_parametro: "PRIMEIRONOME",
      vl_parametro1: "PRIMEIRADESCRICAO",
    });

    const parametro2 = await fakeParametroRepository.criar({
      nm_parametro: "SEGUNDONOME",
      vl_parametro1: "SEGUNDADESCRICAO",
    });

    // Tentando alterar o nome de `parametro1` para o nome de `parametro2`
    await expect(
      alterarParametroService.execute({
        id_parametro: parametro2.id_parametro,
        nm_parametro: "PRIMEIRONOME", // Nome já existente
        vl_parametro1: "SEGUNDADESCRICAO",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
