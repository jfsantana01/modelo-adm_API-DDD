import "reflect-metadata";
import "dotenv/config";
import { app } from "./app";
import { dataSource } from "../typeorm";
import { criarPasta } from "../utils/criarPasta";

dataSource.initialize().then(() => {
  criarPasta("uploads");
  criarPasta("temp");
  criarPasta("public/images");
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API iniciada na porta ${process.env.PORT || 4000}! 🏆`);
  });
});
