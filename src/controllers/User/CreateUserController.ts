import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { verify } from "jsonwebtoken";
import config from "../../config";
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
