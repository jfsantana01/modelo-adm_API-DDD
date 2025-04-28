import AppError from "../../../../src/shared/errors/AppError";
import { FakeAcessoRepository } from "../repositories/fakes/FakeAcessoRepository";
import { CriarAcessoService } from "../../../../src/modules/acesso/services/CriarAcessoService";

describe("CriarAcesso", () => {
  let fakeAcessoRepositorysitory: FakeAcessoRepository;
  let criarAcessoService: CriarAcessoService;
  beforeEach(() => {
    fakeAcessoRepositorysitory = new FakeAcessoRepository();
    criarAcessoService = new CriarAcessoService(fakeAcessoRepositorysitory);
  });

  it("Deve ser capaz de criar um Acesso", async () => {
    const acesso = await criarAcessoService.execute({
      nm_acesso: "TESTENOME",
      ds_acesso: "TESTDESCRICAO",
      in_ativo: true,
    });

    expect(acesso).toHaveProperty("id_acesso");
  });
  it("Não deve ser capaz de criar um Acesso com mesmo nm_acesso", async () => {
    await criarAcessoService.execute({
      nm_acesso: "TESTENOME",
      ds_acesso: "TESTDESCRICAO",
      in_ativo: true,
    });

    expect(
      criarAcessoService.execute({
        nm_acesso: "TESTENOME",
        ds_acesso: "TESTDESCRICAO",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
