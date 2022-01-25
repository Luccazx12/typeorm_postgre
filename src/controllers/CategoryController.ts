import { Request, Response } from "express";
import {
  GetAllCategoriesService,
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
} from "../services/CategoryService";

export class GetAllCategoriesController {
  async handle(request: Request, response: Response) {
    try {
      const service = new GetAllCategoriesService();
      const categories = await service.execute();
      return response.json(categories);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

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

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
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
