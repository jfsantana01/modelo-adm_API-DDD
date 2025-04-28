import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const rootDir = path.join(__dirname, "../../..");
console.log("rootDir:", rootDir);

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASENAME, NODE_ENV } = process.env;
export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASENAME,
  synchronize: process.argv[2] === "sync" ? true : false,
  entities: [rootDir + "/modules/**/infra/typeorm/entities/*.{js,ts}"],
  migrations: [rootDir + "/shared/infra/typeorm/migrations/*.{js,ts}"],
  logging: NODE_ENV === "development" ? true : false,
});
