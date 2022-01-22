import { Router } from "express";
import { CreateCategoryController } from "./controllers/Category/CreateCategoryController";
import { GetAllCategoriesController } from "./controllers/Category/GetAllCategoriesController";
import { DeleteCategoryController } from "./controllers/Category/DeleteCategoryController";
import { UpdateCategoryController } from "./controllers/Category/UpdateCategoryController";
import { CreateProductController } from "./controllers/Product/CreateProductController";
import { GetAllProductsController } from "./controllers/Product/GetAllProductsController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { GetAllUsersController } from "./controllers/User/GetAllUsersController";
import { GetAllRolesController } from "./controllers/User/GetAllRolesController";
import { GetByUsernameController } from "./controllers/User/GetByUsernameController";
import { SigninController } from "./controllers/Auth/SigninController";
import { Authentication } from "./middlewares/Auth";

const routes = Router();

//Categories
routes.post("/categories", new Authentication().ensureAuthentication, new CreateCategoryController().handle);
routes.get("/categories", new Authentication().ensureAuthentication, new GetAllCategoriesController().handle);
routes.put("/categories/:id", new Authentication().ensureAuthentication, new UpdateCategoryController().handle);
routes.delete("/categories/:id", new Authentication().ensureAuthentication, new DeleteCategoryController().handle);

//Products
routes.post("/products", new Authentication().ensureAuthentication, new CreateProductController().handle);
routes.get("/products", new GetAllProductsController().handle);

//Users
routes.post("/users", new CreateUserController().handle);
routes.get("/users", new Authentication().ensureAuthentication, new GetAllUsersController().handle);
routes.get("/users/roles", new Authentication().ensureAuthentication, new GetAllRolesController().handle);
routes.get("/user/:username", new Authentication().ensureAuthentication, new GetByUsernameController().handle);

//Auth
routes.post("/auth/signin", new SigninController().handle);

export { routes };
