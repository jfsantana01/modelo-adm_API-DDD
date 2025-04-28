/* eslint-disable */
const param = process.argv[2]; // Captura o primeiro argumento passado

const { exec } = require("child_process");

if (!param) {
  console.error("Você precisa passar um nome para a migration.");
  process.exit(1);
}
const migrationPath = `src/shared/infra/typeorm/migrations/${param}`;
const command = `npm run typeorm -- migration:create ${migrationPath}`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Resultado: ${stdout}`);
});
