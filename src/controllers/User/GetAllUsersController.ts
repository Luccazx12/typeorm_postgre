import { Request, Response } from "express";
import { GetAllUsersService } from "../../services/User/GetAllUsersService";


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
