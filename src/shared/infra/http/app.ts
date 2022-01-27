import "reflect-metadata";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { serve, setup } from "swagger-ui-express";
import routes from "./routes/routes";
import authRoutes from "./routes/AuthRoutes";
import fs = require("fs");
import favicon from "serve-favicon";
import cors from "cors";

class App {
  public express: express.Application;

  /* Swagger files start */
  private swaggerFile: any =
    process.cwd() + "/src/shared/infra/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/src/shared/infra/swagger/swagger.css",
    "utf8"
  );
  private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private routes(): void {
    // route verify api works
    this.express.get("/", (req, res, next) => {
      res.json({
        message: "Hello Wwworld!",
      });
    });

    // swagger docs
    const options = {
      explorer: true,
      customCss: this.customCss,
    };

    this.express.use("/docs", serve, setup(this.swaggerDocument, options));

    // Routes for controllers
    this.express.use(routes, authRoutes);

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.json({
        message: "Make sure url is correct!",
      });
    });
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(morgan("tiny"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.static("public"));
    this.express.use(favicon(process.cwd() + "/public/images/favicon.ico"));
  }
}

export default new App().express;
