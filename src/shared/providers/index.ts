import { container } from "tsyringe";
import { BcryptHashProvider } from "./hashProvider/implementations/BcryptHashProvider";
import { IHashProvider } from "./hashProvider/models/IHashPovider";

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
