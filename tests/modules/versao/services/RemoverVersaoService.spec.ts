import AppError from "../../../../src/shared/errors/AppError";
import { FakeVersaoRepository } from "../repositories/fakes/FakeVersaoRepository";
import { RemoverVersaoService } from "../../../../src/modules/versao/services/RemoverVersaoService";

describe("RemoverVersao", () => {
  let fakeVersaoRepository: FakeVersaoRepository;
  let removerVersaoService: RemoverVersaoService;
  beforeEach(() => {
    fakeVersaoRepository = new FakeVersaoRepository();
    removerVersaoService = new RemoverVersaoService(fakeVersaoRepository);
  });

  it("Deve ser capaz de remover um Versao", async () => {
    // Primeiro, criamos o versao
    const versao = await fakeVersaoRepository.criar({
      nm_versao: "TESTENOME",
      ds_versao: "TESTDESCRICAO",
    });

    // Agora removemos o versao
    await removerVersaoService.execute({ id_versao: versao.id_versao });

    // Verificamos se o versao foi removido
    const versaoRemovido = await fakeVersaoRepository.buscarPorId(versao.id_versao);
    expect(versaoRemovido).toBeNull(); // Espera-se que o versao tenha sido removido
  });
  it("Não deve ser capaz de remover um Versao inexistente", async () => {
    // Tentando remover um versao que não existe
    await expect(removerVersaoService.execute({ id_versao: "nonexistent-id" })).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de remover um Versao sem id_versao", async () => {
    // Tentando remover sem fornecer um id_versao
    await expect(removerVersaoService.execute({ id_versao: "" })).rejects.toBeInstanceOf(AppError);
  });
});
