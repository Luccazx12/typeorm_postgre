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

const routes = Router();

//Categories
routes.post("/categories", new CreateCategoryController().handle);
routes.get("/categories", new GetAllCategoriesController().handle);
routes.put("/categories/:id", new UpdateCategoryController().handle);
routes.delete("/categories/:id", new DeleteCategoryController().handle);

//Products
routes.post("/products", new CreateProductController().handle);
routes.get("/products", new GetAllProductsController().handle);

//Users
routes.post("/users", new CreateUserController().handle);
routes.get("/users", new GetAllUsersController().handle);
routes.get("/users/roles", new GetAllRolesController().handle);
routes.get("/user/:username", new GetByUsernameController().handle);

export { routes };
