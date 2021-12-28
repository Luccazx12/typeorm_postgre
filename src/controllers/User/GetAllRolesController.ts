import { Request, Response } from "express";
import { GetAllRolesService } from "../../services/User/GetAllRolesService";

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
