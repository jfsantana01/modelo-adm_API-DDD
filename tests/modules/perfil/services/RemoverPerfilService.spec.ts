//import AppError from "@shared/errors/AppError";acesso
import AppError from "../../../../src/shared/errors/AppError";
import { FakePerfilRepository } from "../repositories/fakes/FakePerfilRepository";
import { RemoverPerfilService } from "../../../../src/modules/perfil/services/RemoverPerfilService";

describe("RemoverPerfil", () => {
  let fakePerfilRepository: FakePerfilRepository;
  let removerPerfilService: RemoverPerfilService;

  beforeEach(() => {
    fakePerfilRepository = new FakePerfilRepository();
    removerPerfilService = new RemoverPerfilService(fakePerfilRepository);
  });

  it("Deve ser capaz de remover um Perfil", async () => {
    // Primeiro, criamos o perfil
    const perfil = await fakePerfilRepository.criar({
      nm_perfil: "TESTENOME",
      ds_perfil: "TESTDESCRICAO",
      in_ativo: true,
    });

    // Agora removemos o perfil
    await removerPerfilService.execute({ id_perfil: perfil.id_perfil });

    // Verificamos se o perfil foi removido
    const perfilRemovido = await fakePerfilRepository.buscarPorId(perfil.id_perfil);
    expect(perfilRemovido).toBeNull(); // Espera-se que o perfil tenha sido removido
  });
  it("Não deve ser capaz de remover um Perfil inexistente", async () => {
    // Tentando remover um perfil que não existe
    await expect(removerPerfilService.execute({ id_perfil: "nonexistent-id" })).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de remover um Perfil sem id_perfil", async () => {
    // Tentando remover sem fornecer um id_perfil
    await expect(removerPerfilService.execute({ id_perfil: "" })).rejects.toBeInstanceOf(AppError);
  });
});
