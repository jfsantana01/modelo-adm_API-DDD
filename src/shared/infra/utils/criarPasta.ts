import fs from "fs";
import path from "path";

export async function criarPasta(dir: string) {
  const pasta = path.resolve(dir);
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
    console.log(`Pasta ${dir} criada em: ${pasta}`);
  } else {
    console.log(`Pasta ${dir} já existe em: ${pasta}`);
  }
}
