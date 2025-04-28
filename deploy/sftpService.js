const fs = require("fs");
const Client = require("ssh2-sftp-client");
const { Client: SSHClient } = require("ssh2");
require("events").EventEmitter.defaultMaxListeners = 1000;

module.exports = class sftp {
  constructor(host, port, username, password) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }

  async enviar(origem, destino, recursive) {
    const sftp = new Client();
    try {
      await sftp.connect(this);
      if (recursive) {
        await this.uploadRecursivo(origem, destino, sftp);
      } else {
        await sftp.put(origem, destino);
      }
      console.log("Arquivos enviados com sucesso!");

      return { statuscode: 200, message: "OK" };
    } catch (error) {
      console.log(error);
      return { statuscode: 500, message: error.message };
    } finally {
      await sftp.end();
    }
  }

  async criarDiretorioRemoto(sftp, diretorioRemoto) {
    try {
      await sftp.stat(diretorioRemoto);
    } catch (error) {
      await sftp.mkdir(diretorioRemoto, true);
    }
  }

  async uploadRecursivo(caminhoLocal, caminhoRemoto, sftp) {
    const listaArquivos = fs.readdirSync(caminhoLocal);
    await Promise.all(
      listaArquivos.map(async (arquivo) => {
        const caminhoArquivoLocal = caminhoLocal + "/" + arquivo;
        const caminhoArquivoRemoto = caminhoRemoto + "/" + arquivo;
        if (fs.statSync(caminhoArquivoLocal).isDirectory()) {
          await this.criarDiretorioRemoto(sftp, caminhoArquivoRemoto);
          await this.uploadRecursivo(caminhoArquivoLocal, caminhoArquivoRemoto, sftp);
        } else {
          console.log(caminhoArquivoLocal, caminhoArquivoRemoto);
          await sftp.put(caminhoArquivoLocal, caminhoArquivoRemoto);
        }
      }),
    );
  }

  async restartPM2(appName) {
    if (!appName) {
      return {
        statuscode: 404,
        message: "⚠️⚠️⚠️ .ENV PM2APPNAME não informado. Aplicação não foi reinciada ⚠️⚠️⚠️",
      };
    }
    const ssh = new SSHClient();
    return new Promise((resolve, reject) => {
      ssh
        .on("ready", () => {
          ssh.exec(`pm2 restart ${appName}`, (err, stream) => {
            if (err) return reject({ statuscode: 500, message: err.message });

            stream
              .on("close", (code, signal) => {
                console.log(`PM2 ${appName} reiniciado com sucesso!`);
                ssh.end();
                resolve({ statuscode: 200, message: "PM2 restart com sucesso!" });
              })
              .on("data", (data) => {
                // console.log("STDOUT: " + data);
              })
              .stderr.on("data", (data) => {
                console.log("STDERR: " + data);
              });
          });
        })
        .connect({
          host: this.host,
          port: this.port,
          username: this.username,
          password: this.password,
        });
    });
  }
};
