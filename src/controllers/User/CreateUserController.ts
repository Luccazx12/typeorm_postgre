import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, password, email, role_id } = request.body;
    try {
      const service = new CreateUserService();

      const result = await service.execute({
        name,
        username,
        password,
        email,
        role_id,
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
