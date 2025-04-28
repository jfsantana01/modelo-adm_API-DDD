const utils = require("./util");
const Sftp = require("./sftpService");
const copyService = require("./copyService");
require("dotenv").config();

async function start() {
  var servidor = process.argv[2];
  console.log("Preparando build para " + servidor + "...");
  if (servidor == "contabo1") {
    var tipoEnvio = process.env.DIGITALOCEAN1_TIPOENVIO;
    var host = process.env.DIGITALOCEAN1_HOST;
    var user = process.env.DIGITALOCEAN1_USER;
    var password = process.env.DIGITALOCEAN1_PASSWORD;
    var destino = process.env.DIGITALOCEAN1_DESTINO;
    var pm2APPName = process.env.PM2APPNAME;
  } else if (servidor == "contabo1hml") {
    var tipoEnvio = process.env.DIGITALOCEAN1_HML_TIPOENVIO;
    var host = process.env.DIGITALOCEAN1_HML_HOST;
    var user = process.env.DIGITALOCEAN1_HML_USER;
    var password = process.env.DIGITALOCEAN1_HML_PASSWORD;
    var destino = process.env.DIGITALOCEAN1_HML_DESTINO;
    var pm2APPName = process.env.PM2APPNAME;
  } else {
    console.log("Servidor não informado");
    return;
  }
  if (!tipoEnvio) {
    console.log("tipoEnvio não informado");
    return;
  }

  console.log("Alterando Versão...");
  const resultAlterarVersao = await utils.alterarVersao();
  if (resultAlterarVersao.statuscode != 200) {
    console.log(resultAlterarVersao.message);
    return;
  }

  console.log("Limpando Build...");
  var resultLimpar = await utils.executar("tsc --build --clean");
  if (resultLimpar.statuscode != 200) {
    console.log(resultLimpar.message);
    return;
  }
  console.log("Executando transpile...");
  var resultCompilar = await utils.executar("tsc");
  if (resultCompilar.statuscode != 200) {
    console.log(resultCompilar.message);
    return;
  }

  console.log("Copiando arquivos de configuração...");
  var resultCompilar = await utils.executar("npm run copy-files");
  if (resultCompilar.statuscode != 200) {
    console.log(resultCompilar.message);
    return;
  }
  console.log("Removendo pasta downloads...");
  var resultRemover = await utils.removePasta("./dist/downloads");
  if (resultRemover.statuscode != 200) {
    console.log(resultRemover.message);
    return;
  }

  console.log(`Copiando para servidor por ${tipoEnvio}...`);
  if (tipoEnvio == "sftp") {
    const resultSftp = await new Sftp(host, 22, user, password).enviar("./dist", destino, true);
    if (resultSftp.statuscode != 200) {
      console.log(resultSftp.message);
      return;
    }
    console.log("Reiniciando " + pm2APPName);
    const resultRestartPM2 = await new Sftp(host, 22, user, password).restartPM2(pm2APPName);
    if (resultRestartPM2.statuscode != 200) {
      console.log(resultRestartPM2.message);
      return;
    }
  } else if (tipoEnvio == "copy") {
    const resultCopy = await copyService.copyFiles("./dist", destino);
    if (resultCopy.statuscode != 200) {
      console.log(resultCopy.message);
      return;
    }
  }

  console.log("Fim");
}
start();
