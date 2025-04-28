import AppError from "../../../../src/shared/errors/AppError";
import { FakePerfilRepository } from "../repositories/fakes/FakePerfilRepository";
import { CriarPerfilService } from "../../../../src/modules/perfil/services/CriarPerfilService";

describe("CriarPerfil", () => {
  let fakePerfilRepository: FakePerfilRepository;
  let criarPerfilService: CriarPerfilService;

  beforeEach(() => {
    fakePerfilRepository = new FakePerfilRepository();
    criarPerfilService = new CriarPerfilService(fakePerfilRepository);
  });

  it("Deve ser capaz de criar um Perfil", async () => {
    const perfil = await criarPerfilService.execute({
      nm_perfil: "TESTENOME",
      ds_perfil: "TESTDESCRICAO",
      in_ativo: true,
    });

    expect(perfil).toHaveProperty("id_perfil");
  });
  it("Não deve ser capaz de criar um Perfil com mesmo nm_perfil", async () => {
    await criarPerfilService.execute({
      nm_perfil: "TESTENOME",
      ds_perfil: "TESTDESCRICAO",
      in_ativo: true,
    });

    expect(
      criarPerfilService.execute({
        nm_perfil: "TESTENOME",
        ds_perfil: "TESTDESCRICAO",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
