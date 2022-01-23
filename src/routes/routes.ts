import express from "express";
import { SigninController } from "../controllers/Auth/SigninController";
import { GetAllProductsController } from "../controllers/Product/GetAllProductsController";
import { CreateUserController } from "../controllers/User/CreateUserController";
import { GetAllCategoriesController } from "../controllers/Category/GetAllCategoriesController";
import { GetByUsernameController } from "../controllers/User/GetByUsernameController"


class Routes {
  public router: express.Application;

  constructor() {
    this.router = express();
    this.routes();
  }

  private routes(): void {
    //Products
    this.router.get("/products", new GetAllProductsController().handle);

    //Categories
    this.router.get("/categories", new GetAllCategoriesController().handle);

    //Users
    this.router.get("/user/:username", new GetByUsernameController().handle);
    // Registrando usuário (Se o usuário não estiver logado, será criado
    // um usuário padrão, sem permissões especiais)
    this.router.post("/users", new CreateUserController().handle);

    //Login
    this.router.post("/auth/signin", new SigninController().handle);
  }
}

export default new Routes().router;
