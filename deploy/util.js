const fs = require("fs-extra");
const path = require("path");
const destinoTemporario = "c:/temp"; // Diretório temporário
const { promisify } = require("util");
const execute =
  process.env.SystemDrive == "C:" ? promisify(require("child_process").exec) : require("@getvim/execute").execute;

class Util {
  async alterarVersao() {
    return await this.executar(`npm version patch --no-git-tag-version`);
  }

  async criarPasta(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      return { message: "Pasta Criada", statuscode: 200 };
    } catch (error) {
      console.log(error);
      return { message: error.message, statuscode: 500 };
    }
  }
  async copiaArquivos(origem, destino, pastasExcluir) {
    //npm install fs-extra
    try {
      await fs.ensureDir(destinoTemporario);
      await fs.copy(origem, destinoTemporario, {
        filter: (src, dest) => {
          const relPath = path.relative(origem, src);
          return !pastasExcluir.some((pasta) => relPath.startsWith(pasta));
        },
      });
      await fs.move(destinoTemporario, destino, { overwrite: true });
      return { statuscode: 200, message: "OK", data: [] };
    } catch (error) {
      return { statuscode: 500, message: error.message, data: [] };
    }
  }
  async removePasta(pasta) {
    try {
      if (fs.existsSync(pasta)) {
        fs.rmSync(pasta, { recursive: true, force: true });
      }
      return { message: pasta + "removido", statuscode: 200 };
    } catch (error) {
      return { message: error.message, statuscode: 500 };
    }
  }
  async executar(cmd) {
    let result = await execute(cmd)
      .then(async () => {
        return { statuscode: 200, message: "OK", data: [] };
      })
      .catch((error) => {
        return { statuscode: 500, message: error.message, data: [] };
      });
    return result;
  }
}
module.exports = new Util();
