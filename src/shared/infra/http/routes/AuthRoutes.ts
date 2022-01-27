import express from "express";
import { Request, Response, NextFunction } from "express";
import config from "@config/auth";
import { CategoryController } from "@modules/Categories/infra/http/controllers/CategoryController";
import { UserController } from "@modules/Users/infra/http/controllers/UserController";
import { ProductController } from "@modules/Products/infra/http/controllers/ProductController";
import { CheckRoles } from "@modules/Users/infra/http/middlewares/CheckRoles";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  info: any;
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
        const { info, sub } = verify(token, config.jwt.secret) as ITokenPayload;

        request.user = {
          id: sub,
          info: info,
        };

        console.log(
          `Private Route accessed! Username: ${info.username}. JWT Token: ${token}`
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
    this.authRoutes.post(
      "/categories",
      /*
      #swagger.tags = ["Categories_auth"]
      */
      new CategoryController().createCategory
    );
    this.authRoutes.put(
      "/categories/:id",
      /*
      #swagger.tags = ["Categories_auth"]
      */
      new CategoryController().updateCategory
    );
    this.authRoutes.delete(
      "/categories/:id",
      /*
      #swagger.tags = ["Categories_auth"]
      */
      new CategoryController().deleteCategory
    );

    //Products
    this.authRoutes.post(
      "/products",
      /*
      #swagger.tags = ["Products_auth"]
      */
      new ProductController().createProducts
    );

    this.authRoutes.put(
      "/changeProduct/:id",
      /*
      #swagger.tags = ["Products_auth"]
      */
      new ProductController().updateProduct
    );

    //Users
    this.authRoutes.get(
      "/allUsers",
      /*
      #swagger.tags = ["Users_auth"]
      */
      checkRole,
      new UserController().getAllUsers
    );
    this.authRoutes.get(
      "/users/roles",
      /*
      #swagger.tags = ["Users_auth"]
      */
      checkRole,
      new UserController().getAllRoles
    );

    this.authRoutes.get(
      "/users/search/:username",
      /*
      #swagger.tags = ["Users_auth"]
      */
      checkRole,
      new UserController().searchByUsername
    );
  }
}

export default new AuthRoutes().authRoutes;
