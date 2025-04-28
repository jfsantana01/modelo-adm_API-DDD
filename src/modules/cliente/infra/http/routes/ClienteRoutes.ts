import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import { validarAcesso } from "@shared/infra/http/middlewares/validarAcesso";
import { validaAlterarCliente, validaCriarCliente } from "../middlewares/ClienteValidate";
//import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

const clienteRouter = Router();
const clienteController = new ClienteController();

//clienteRouter.use(rateLimiter);
clienteRouter.use(isAuthenticated);
clienteRouter.get("/v1/", validarAcesso("CLIENTE_CONSULTAR"), clienteController.listar);
clienteRouter.post("/v1/", validarAcesso("CLIENTE_CRIAR"), validaCriarCliente, clienteController.criar);
clienteRouter.put("/v1/", validarAcesso("CLIENTE_CRIAR"), validaAlterarCliente, clienteController.alterar);

export default clienteRouter;
