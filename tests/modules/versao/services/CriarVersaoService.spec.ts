import AppError from "../../../../src/shared/errors/AppError";
import { FakeVersaoRepository } from "../repositories/fakes/FakeVersaoRepository";
import { CriarVersaoService } from "../../../../src/modules/versao/services/CriarVersaoService";

describe("CriarVersao", () => {
  let fakeVersaoRepositorysitory: FakeVersaoRepository;
  let criarVersaoService: CriarVersaoService;
  beforeEach(() => {
    fakeVersaoRepositorysitory = new FakeVersaoRepository();
    criarVersaoService = new CriarVersaoService(fakeVersaoRepositorysitory);
  });

  it("Deve ser capaz de criar um Versao", async () => {
    const versao = await criarVersaoService.execute({
      nm_versao: "TESTENOME",
      ds_versao: "TESTDESCRICAO",
    });

    expect(versao).toHaveProperty("id_versao");
  });
  it("Não deve ser capaz de criar um Versao com mesmo nm_versao", async () => {
    await criarVersaoService.execute({
      nm_versao: "TESTENOME",
      ds_versao: "TESTDESCRICAO",
    });

    expect(
      criarVersaoService.execute({
        nm_versao: "TESTENOME",
        ds_versao: "TESTDESCRICAO",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
