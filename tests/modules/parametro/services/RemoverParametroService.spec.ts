import AppError from "../../../../src/shared/errors/AppError";
import { FakeParametroRepository } from "../repositories/fakes/FakeParametroRepository";
import { RemoverParametroService } from "../../../../src/modules/parametro/services/RemoverParametroService";

describe("RemoverParametro", () => {
  let fakeParametroRepository: FakeParametroRepository;
  let removerParametroService: RemoverParametroService;
  beforeEach(() => {
    fakeParametroRepository = new FakeParametroRepository();
    removerParametroService = new RemoverParametroService(fakeParametroRepository);
  });

  it("Deve ser capaz de remover um Parametro", async () => {
    // Primeiro, criamos o parametro
    const parametro = await fakeParametroRepository.criar({
      nm_parametro: "TESTENOME",
      vl_parametro1: "TESTDESCRICAO",
    });

    // Agora removemos o parametro
    await removerParametroService.execute({ id_parametro: parametro.id_parametro });

    // Verificamos se o parametro foi removido
    const parametroRemovido = await fakeParametroRepository.buscarPorId(parametro.id_parametro);
    expect(parametroRemovido).toBeNull(); // Espera-se que o parametro tenha sido removido
  });
  it("Não deve ser capaz de remover um Parametro inexistente", async () => {
    // Tentando remover um parametro que não existe
    await expect(removerParametroService.execute({ id_parametro: "nonexistent-id" })).rejects.toBeInstanceOf(AppError);
  });

  it("Não deve ser capaz de remover um Parametro sem id_parametro", async () => {
    // Tentando remover sem fornecer um id_parametro
    await expect(removerParametroService.execute({ id_parametro: "" })).rejects.toBeInstanceOf(AppError);
  });
});
