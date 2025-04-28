import AppError from "../../../../src/shared/errors/AppError";
import { FakeParametroRepository } from "../repositories/fakes/FakeParametroRepository";
import { CriarParametroService } from "../../../../src/modules/parametro/services/CriarParametroService";

describe("CriarParametro", () => {
  let fakeParametroRepositorysitory: FakeParametroRepository;
  let criarParametroService: CriarParametroService;
  beforeEach(() => {
    fakeParametroRepositorysitory = new FakeParametroRepository();
    criarParametroService = new CriarParametroService(fakeParametroRepositorysitory);
  });

  it("Deve ser capaz de criar um Parametro", async () => {
    const parametro = await criarParametroService.execute({
      nm_parametro: "TESTENOME",
      vl_parametro1: "TESTDESCRICAO",
    });

    expect(parametro).toHaveProperty("id_parametro");
  });
  it("Não deve ser capaz de criar um Parametro com mesmo nm_parametro", async () => {
    await criarParametroService.execute({
      nm_parametro: "TESTENOME",
      vl_parametro1: "TESTDESCRICAO",
    });

    expect(
      criarParametroService.execute({
        nm_parametro: "TESTENOME",
        vl_parametro1: "TESTDESCRICAO",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
