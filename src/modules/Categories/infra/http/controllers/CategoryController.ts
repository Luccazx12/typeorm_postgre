import { Request, Response } from "express";
import { GetAllCategoriesService } from "@modules/Categories/services/GetAllCategoriesService";
import { CreateCategoryService } from "@modules/Categories/services/CreateCategoryService";
import { UpdateCategoryService } from "@modules/Categories/services/UpdateCategoryService";
import { DeleteCategoryService } from "@modules/Categories/services/DeleteCategoryService";

export class CategoryController {
  async getAlLCategories(request: Request, response: Response) {
    try {
      const service = new GetAllCategoriesService();
      const categories = await service.execute();
      return response.json(categories);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async createCategory(request: Request, response: Response) {
    const { name, description, defaultPrice } = request.body;
    try {
      const service = new CreateCategoryService();

      const result = await service.execute({
        id: "",
        activated: true,
        name,
        description,
        defaultPrice,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async updateCategory(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description, defaultPrice, activated } = request.body;

    try {
      const service = new UpdateCategoryService();

      const result = await service.execute({
        id,
        name,
        description,
        defaultPrice,
        activated,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.json(result);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async deleteCategory(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const service = new DeleteCategoryService();

      const result = await service.execute(id);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }
      return response.status(204).end();
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
