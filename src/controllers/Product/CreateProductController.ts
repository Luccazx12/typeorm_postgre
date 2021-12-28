import { Request, Response } from "express";
import { CreateProductService } from "../../services/Product/CreateProductService";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price, category_id, user_id} = request.body;
    try {
      const service = new CreateProductService();

      const result = await service.execute({
        name,
        description,
        price,
        category_id,
        user_id
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
