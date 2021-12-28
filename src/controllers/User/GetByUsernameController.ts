import { Request, Response } from "express";
import { GetByUsernameService } from "../../services/User/GetByUsernameService";

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
