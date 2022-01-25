import { Request, Response } from "express";
import {
  GetAllProductsService,
  CreateProductService,
} from "../services/ProductService";

export class GetAllProductsController {
  async handle(request: Request, response: Response) {
    try {
      const service = new GetAllProductsService();
      const products = await service.execute();
      return response.json(products);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, description, price, category_id, user_id } = request.body;
    try {
      const service = new CreateProductService();

      const result = await service.execute({
        name,
        description,
        price,
        category_id,
        user_id,
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
