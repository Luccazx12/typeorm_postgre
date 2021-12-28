import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/Category/CreateCategoryService";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description, defaultPrice } = request.body;
    try {
      const service = new CreateCategoryService();

      const result = await service.execute({ name, description, defaultPrice });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
