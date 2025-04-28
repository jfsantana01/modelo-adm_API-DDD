import AppError from "../../../../src/shared/errors/AppError";
import { RemoverAcessoDoPerfilService } from "../../../../src/modules/perfil/services/RemoverAcessoDoPerfilService";
import { FakePerfilRepository } from "../../perfil/repositories/fakes/FakePerfilRepository";
import { FakeAcessoRepository } from "../../acesso/repositories/fakes/FakeAcessoRepository";

describe("RemoverAcessoDoPerfilService", () => {
  let fakePerfilRepository: FakePerfilRepository;
  let fakeAcessoRepository: FakeAcessoRepository;
  let removerAcessoDoPerfilService: RemoverAcessoDoPerfilService;

  beforeEach(() => {
    fakePerfilRepository = new FakePerfilRepository();
    fakeAcessoRepository = new FakeAcessoRepository();
    //removerAcessoDoPerfilService = new RemoverAcessoDoPerfilService(fakeAcessoRepository, fakePerfilRepository);
  });

  it("Deve ser capaz de remover um acesso de um perfil", async () => {
    // Criar um acesso
    const acesso = await fakeAcessoRepository.criar({
      nm_acesso: "acesso_teste",
      ds_acesso: "ACESSO TESTE",
    });

    // Criar um perfil com um acesso
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "perfil_teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
      acessos: [acesso], // Adicionando acesso ao perfil
    });

    // Verificar que o perfil foi criado com o acesso
    expect(perfil.acessos).toHaveLength(1);
    expect(perfil.acessos[0].id_acesso).toEqual(acesso.id_acesso);

    // Remover o acesso do perfil
    const perfilAtualizado = await removerAcessoDoPerfilService.execute({
      id_acesso: acesso.id_acesso,
      id_perfil: perfil.id_perfil,
    });

    // Verificar que o acesso foi removido
    expect(perfilAtualizado.acessos).toHaveLength(0);
  });

  it("Não deve ser capaz de remover um acesso de um perfil inexistente", async () => {
    await expect(
      removerAcessoDoPerfilService.execute({
        id_acesso: "id_inexistente",
        id_perfil: "id_inexistente",
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificar que lança um erro
  });

  it("Não deve ser capaz de remover um acesso que não existe no perfil", async () => {
    // Criar perfil sem acessos
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "Perfil Teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
      acessos: [],
    });

    // Criar um acesso que não está no perfil
    const acessoInexistente = await fakeAcessoRepository.criar({
      nm_acesso: "acesso_inexistente",
      ds_acesso: "Acesso que não existe",
    });

    await expect(
      removerAcessoDoPerfilService.execute({
        id_acesso: acessoInexistente.id_acesso,
        id_perfil: perfil.id_perfil,
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificar que lança um erro
  });
});
