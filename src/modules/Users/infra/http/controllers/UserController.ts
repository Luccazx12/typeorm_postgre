import { Request, Response } from "express";
import config from "@config/auth";
import { CreateUserService } from "@modules/Users/services/CreateUserService";
import { SearchByUsernameService } from "@modules/Users/services/SearchByUsernameService";
import { GetByUsernameService } from "@modules/Users/services/GetByUsernameService";
import { GetAllUsersService } from "@modules/Users/services/GetAllUsersService";
import { GetAllRolesService } from "@modules/Users/services/GetAllRolesService";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  info: any;
}

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, username, password, email, role_id } = request.body;
    let admin = false;

    try {
      const service = new CreateUserService();

      const authHeader = request.headers.authorization;
      if (authHeader) {
        const [_, token] = authHeader.split(" ");
        const { info } = verify(token, config.jwt.secret) as ITokenPayload;
        if (info.role === "Admin") {
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

  async searchByUsername(request: Request, response: Response) {
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

  async getByUsername(request: Request, response: Response) {
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

  async getAllUsers(request: Request, response: Response) {
    try {
      const service = new GetAllUsersService();
      const users = await service.execute();
      return response.json(users);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async getAllRoles(request: Request, response: Response) {
    try {
      const service = new GetAllRolesService();
      const users = await service.execute();
      return response.json(users);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
