import AppError from "../../../../src/shared/errors/AppError";
import { FakeAcessoRepository } from "../repositories/fakes/FakeAcessoRepository";
import { RemoverAcessoService } from "../../../../src/modules/acesso/services/RemoverAcessoService";

describe("RemoverAcesso", () => {
  let fakeAcessoRepository: FakeAcessoRepository;
  let removerAcessoService: RemoverAcessoService;
  beforeEach(() => {
    fakeAcessoRepository = new FakeAcessoRepository();
    removerAcessoService = new RemoverAcessoService(fakeAcessoRepository);
  });

  it("Deve ser capaz de remover um Acesso", async () => {
    // Primeiro, criamos o acesso
    const acesso = await fakeAcessoRepository.criar({
      nm_acesso: "TESTENOME",
      ds_acesso: "TESTDESCRICAO",
      in_ativo: true,
    });

    // Agora removemos o acesso
    await removerAcessoService.execute({ id_acesso: acesso.id_acesso });

    // Verificamos se o acesso foi removido
    const acessoRemovido = await fakeAcessoRepository.buscarPorId(acesso.id_acesso);
    expect(acessoRemovido).toBeNull(); // Espera-se que o acesso tenha sido removido
  });
  it("Não deve ser capaz de remover um Acesso inexistente", async () => {
    // Tentando remover um acesso que não existe
    await expect(removerAcessoService.execute({ id_acesso: "nonexistent-id" })).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de remover um Acesso sem id_acesso", async () => {
    // Tentando remover sem fornecer um id_acesso
    await expect(removerAcessoService.execute({ id_acesso: "" })).rejects.toBeInstanceOf(AppError);
  });
});
