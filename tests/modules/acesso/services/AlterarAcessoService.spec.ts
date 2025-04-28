import AppError from "../../../../src/shared/errors/AppError";
import { FakeAcessoRepository } from "../repositories/fakes/FakeAcessoRepository";
import { AlterarAcessoService } from "../../../../src/modules/acesso/services/AlterarAcessoService";

describe("AlterarAcessoService", () => {
  let fakeAcessoRepository: FakeAcessoRepository;
  let alterarAcessoService: AlterarAcessoService;

  beforeEach(() => {
    fakeAcessoRepository = new FakeAcessoRepository();
    alterarAcessoService = new AlterarAcessoService(fakeAcessoRepository);
  });

  it("Deve ser capaz de alterar um Acesso", async () => {
    // Criando o acesso
    const acesso = await fakeAcessoRepository.criar({
      nm_acesso: "TESTENOME",
      ds_acesso: "TESTDESCRICAO",
      in_ativo: true,
    });

    // Alterando o acesso
    const acessoAlterado = await alterarAcessoService.execute({
      id_acesso: acesso.id_acesso,
      nm_acesso: "NOVONOME",
      ds_acesso: "NOVADESCRICAO",
      in_ativo: true,
    });

    // Verificando se o acesso foi alterado
    expect(acessoAlterado.nm_acesso).toBe("NOVONOME");
    expect(acessoAlterado.ds_acesso).toBe("NOVADESCRICAO");
  });

  it("Não deve ser capaz de alterar um Acesso inexistente", async () => {
    // Tentando alterar um acesso que não existe
    await expect(
      alterarAcessoService.execute({
        id_acesso: "id_inexistente", // ID que não existe
        nm_acesso: "NOVONOME",
        ds_acesso: "NOVADESCRICAO",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de alterar o nome para um nome de Acesso já existente", async () => {
    // Criando dois acessos com nomes diferentes
    await fakeAcessoRepository.criar({
      nm_acesso: "PRIMEIRONOME",
      ds_acesso: "PRIMEIRADESCRICAO",
      in_ativo: true,
    });

    const acesso2 = await fakeAcessoRepository.criar({
      nm_acesso: "SEGUNDONOME",
      ds_acesso: "SEGUNDADESCRICAO",
      in_ativo: true,
    });

    // Tentando alterar o nome de `acesso1` para o nome de `acesso2`
    await expect(
      alterarAcessoService.execute({
        id_acesso: acesso2.id_acesso,
        nm_acesso: "PRIMEIRONOME", // Nome já existente
        ds_acesso: "SEGUNDADESCRICAO",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
