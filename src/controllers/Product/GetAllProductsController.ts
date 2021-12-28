import { Request, Response } from "express";
import { GetAllProductsService } from "../../services/Product/GetAllProductsService";

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
