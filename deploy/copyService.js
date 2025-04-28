const fs = require("fs-extra");
class CopyService {
  async copyFiles(origem, destino) {
    try {
      await fs.copy(origem, destino);
      return { message: "Pasta Criada", statuscode: 200 };
    } catch (error) {
      return { message: error.message, statuscode: 500 };
    }
  }
}
module.exports = new CopyService();
