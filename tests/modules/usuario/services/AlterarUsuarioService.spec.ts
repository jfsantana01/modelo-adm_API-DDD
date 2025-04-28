import AppError from "../../../../src/shared/errors/AppError";
import { FakeUsuarioRepository } from "../repositories/fakes/FakeUsuarioRepository";
import { AlterarUsuarioService } from "../../../../src/modules/usuario/services/AlterarUsuarioService";

describe("AlterarUsuarioService", () => {
  it("Deve ser capaz de alterar um Usuario", async () => {
    const fakeUsuarioRepo = new FakeUsuarioRepository();
    const alterarUsuarioService = new AlterarUsuarioService(fakeUsuarioRepo);

    // Criando o usuario
    const usuario = await fakeUsuarioRepo.criar({
      nm_usuario: "TESTENOME",
      ds_login: "teste_login",
      in_ativo: true,
    });

    // Alterando o usuario
    const usuarioAlterado = await alterarUsuarioService.execute({
      id_usuario: usuario.id_usuario,
      nm_usuario: "DESATIVADO",
      in_ativo: false,
    });

    // Verificando se o usuario foi alterado
    expect(usuarioAlterado.nm_usuario).toBe("DESATIVADO");
    expect(usuarioAlterado.in_ativo).toBe(false);
  });

  it("Não deve ser capaz de alterar um Usuario inexistente", async () => {
    const fakeUsuarioRepo = new FakeUsuarioRepository();
    const alterarUsuarioService = new AlterarUsuarioService(fakeUsuarioRepo);

    // Tentando alterar um usuario que não existe
    await expect(
      alterarUsuarioService.execute({
        id_usuario: "id_inexistente", // ID que não existe
        nm_usuario: "NOVONOME",
        in_ativo: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
