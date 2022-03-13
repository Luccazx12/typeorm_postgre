import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
// import favicon from 'serve-favicon';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';

class App {
  public express: express.Application;

  /* Swagger files start */
  private swaggerFile: any =
    process.cwd() + '/src/shared/infra/swagger/swagger.json';
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  private customCss: any = fs.readFileSync(
    process.cwd() + '/src/shared/infra/swagger/swagger.css',
    'utf8',
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
    this.express.get('/', (req, res, next) => {
      res.json({
        message: 'Hello Wwworld!',
      });
    });

    // swagger docs
    const options = {
      explorer: true,
      customCss: this.customCss,
    };

    this.express.use('/docs', serve, setup(this.swaggerDocument, options));

    // Routes for controllers
    this.express.use(routes);

    this.express.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          console.log(err);
          return response.json({
            status: 'error',
            message: err.message,
          });
        } else {
          console.log('\x1b[31m', err);
          return response.status(500).json({
            status: 'error',
            message: 'Internal server error. Try again later.',
          });
        }
      },
    );

    // handle undefined routes
    this.express.use('*', (req, res, next) => {
      res.json({
        message: 'Make sure url is correct!',
      });
    });
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(morgan('tiny'));
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use('/files', express.static(uploadConfig.uploadsFolder));
    // this.express.use(favicon(process.cwd() + '/public/images/favicon.ico'));
  }
}

export default new App().express;
