import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/Category/UpdateCategoryService";

export class UpdateCategoryController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, defaultPrice, actived } = request.body;

    try {
      const service = new UpdateCategoryService();

      const result = await service.execute({
        id,
        name,
        description,
        defaultPrice,
        actived,
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
