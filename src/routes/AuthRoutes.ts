import express from "express";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import {
  CreateCategoryController,
  UpdateCategoryController,
  DeleteCategoryController,
} from "../controllers/CategoryController";
import {
  GetAllUsersController,
  GetAllRolesController,
  SearchByUsernameController,
} from "../controllers/UserController";
import { CreateProductController } from "../controllers/ProductController";
import { CheckRoles } from "../middlewares/CheckRoles";
import { verify } from "jsonwebtoken";


interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class AuthRoutes {
  public authRoutes: express.Application;

  constructor() {
    this.authRoutes = express();
    this.routes();
  }

  private routes(): void {
    this.authRoutes.use(async function (
      request: Request,
      response: Response,
      next: NextFunction
    ) {
      response.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );

      const authHeader = request.headers.authorization;

      if (!authHeader) {
        // throw new Error('JWT token is missing.');
        return response.status(401).json("JWT token is missing.");
      }

      const [_, token] = authHeader.split(" ");

      try {
        const decoded = verify(token, config.keyJwt);

        const { sub } = decoded as ITokenPayload;

        request.user = {
          id: sub,
          info: decoded,
        };

        console.log(
          `Private Route accessed! Username: ${decoded.username}. JWT Token: ${token}`
        );

        return next();
      } catch (err) {
        // throw new Error('Invalid JWT token');
        return response.status(401).json("Invalid JWT token");
      }
    });

    // Instânciando classe CheckRoles para verificar
    // se o usuário é administrador em determinada rota
    const checkRole = new CheckRoles().isAdmin;

    //Categories
    this.authRoutes.post("/categories", new CreateCategoryController().handle);
    this.authRoutes.put(
      "/categories/:id",
      new UpdateCategoryController().handle
    );
    this.authRoutes.delete(
      "/categories/:id",
      new DeleteCategoryController().handle
    );

    //Products
    this.authRoutes.post("/products", new CreateProductController().handle);

    //Users
    this.authRoutes.get(
      "/users",
      checkRole,
      new GetAllUsersController().handle
    );
    this.authRoutes.get(
      "/users/roles",
      checkRole,
      new GetAllRolesController().handle
    );

    this.authRoutes.get(
      "/users/search/:username",
      checkRole,
      new SearchByUsernameController().handle
    );
  }
}

export default new AuthRoutes().authRoutes;
