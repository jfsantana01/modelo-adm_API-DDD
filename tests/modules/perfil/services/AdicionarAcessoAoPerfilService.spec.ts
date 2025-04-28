import AppError from "../../../../src/shared/errors/AppError";
import { AdicionarAcessoAoPerfilService } from "../../../../src/modules/perfil/services/AdicionarAcessoAoPerfilService";
import { FakeAcessoRepository } from "../../acesso/repositories/fakes/FakeAcessoRepository";
import { FakePerfilRepository } from "../repositories/fakes/FakePerfilRepository";

describe("AdicionarAcessoAoPerfilService", () => {
  let fakeAcessoRepository: FakeAcessoRepository;
  let fakePerfilRepository: FakePerfilRepository;
  let adicionarAcessoAoPerfilService: AdicionarAcessoAoPerfilService;

  beforeEach(() => {
    fakeAcessoRepository = new FakeAcessoRepository();
    fakePerfilRepository = new FakePerfilRepository();
    adicionarAcessoAoPerfilService = new AdicionarAcessoAoPerfilService(fakeAcessoRepository, fakePerfilRepository);
  });

  it("Deve ser capaz de adicionar um acesso a um perfil", async () => {
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "Perfil Teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
    });

    const acesso = await fakeAcessoRepository.criar({
      nm_acesso: "Acesso Teste",
      ds_acesso: "Descrição Teste",
      in_ativo: true,
    });

    const perfilAtualizado = await adicionarAcessoAoPerfilService.execute({
      id_acesso: acesso.id_acesso,
      id_perfil: perfil.id_perfil,
    });

    expect(perfilAtualizado.acessos).toContainEqual(acesso);
  });

  it("Não deve ser capaz de adicionar um acesso a um perfil inexistente", async () => {
    await expect(
      adicionarAcessoAoPerfilService.execute({
        id_acesso: "acesso_teste",
        id_perfil: "perfil_inexistente",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de adicionar um acesso inexistente a um perfil", async () => {
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "Perfil Teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
    });

    await expect(
      adicionarAcessoAoPerfilService.execute({
        id_acesso: "acesso_inexistente",
        id_perfil: perfil.id_perfil,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de adicionar um acesso que o perfil já possui", async () => {
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "Perfil Teste",
      ds_perfil: "Descrição Teste",
      in_ativo: true,
    });

    const acesso = await fakeAcessoRepository.criar({
      nm_acesso: "Acesso Teste",
      ds_acesso: "Descrição Teste",
      in_ativo: true,
    });

    // Adicionando o acesso ao perfil
    perfil.acessos = [];
    perfil.acessos.push(acesso);
    await fakePerfilRepository.alterar(perfil);

    // Tentando adicionar o mesmo acesso novamente
    await expect(
      adicionarAcessoAoPerfilService.execute({
        id_acesso: acesso.id_acesso,
        id_perfil: perfil.id_perfil,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
