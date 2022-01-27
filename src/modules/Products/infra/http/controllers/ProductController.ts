import { Request, Response } from "express";
import { GetAllProductsService } from "@modules/Products/services/GetAllProductsService";
import { CreateProductService } from "@modules/Products/services/CreateProductService";
import { UpdateProductService } from "@modules/Products/services/UpdateProductService";

export class ProductController {
  async getAllProducts(request: Request, response: Response) {
    try {
      const service = new GetAllProductsService();
      const products = await service.execute();
      return response.json(products);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async createProducts(request: Request, response: Response) {
    const { name, description, price, category_id } = request.body;
    try {
      const service = new CreateProductService();

      const result = await service.execute({
        id: "",
        activated: true,
        name,
        description,
        price,
        category_id,
        user_id: request.user.info.id,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async updateProduct(request: Request, response: Response) {
    let { name, description, price, category_id, activated } = request.body;
    let { id } = request.params;

    try {
      const service = new UpdateProductService();

      if (request.user.info.role === "User") {
        id = "";
        name = null;
        description = null;
        price = null;
        category_id = null;
      }

      const result = await service.execute({
        id,
        name,
        description,
        price,
        category_id,
        user_id: request.user.info.id,
        activated,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
