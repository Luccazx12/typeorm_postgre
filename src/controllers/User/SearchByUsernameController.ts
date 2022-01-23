import { Request, Response } from "express";
import { SearchByUsernameService } from "../../services/User/SearchByUsernameService";

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
