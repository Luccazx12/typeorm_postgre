import express from "express";
import { SigninController } from "../controllers/AuthController";
import { GetAllProductsController } from "../controllers/ProductController";
import {
  CreateUserController,
  GetByUsernameController,
} from "../controllers/UserController";
import { GetAllCategoriesController } from "../controllers/CategoryController";

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
