import { Request, Response } from "express";
import config from "../config";
import {
  CreateUserService,
  SearchByUsernameService,
  GetByUsernameService,
  GetAllUsersService,
  GetAllRolesService,
} from "../services/UserService";
import { verify } from "jsonwebtoken";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, password, email, role_id } = request.body;
    let admin = false;

    try {
      const service = new CreateUserService();

      const authHeader = request.headers.authorization;
      if (authHeader) {
        const [_, token] = authHeader.split(" ");
        const decoded = verify(token, config.keyJwt);
        if (decoded.role === "Admin") {
          admin = true;
        }
      }

      const result = await service.execute({
        name,
        username,
        password,
        email,
        role_id,
        admin,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export class SearchByUsernameController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;
    try {
      const service = new SearchByUsernameService();
      const result = await service.execute(username);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export class GetByUsernameController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;
    try {
      const service = new GetByUsernameService();
      const result = await service.execute(username);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export class GetAllUsersController {
  async handle(request: Request, response: Response) {
    try {
      const service = new GetAllUsersService();
      const users = await service.execute();
      return response.json(users);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export class GetAllRolesController {
  async handle(request: Request, response: Response) {
    try {
      const service = new GetAllRolesService();
      const users = await service.execute();
      return response.json(users);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
