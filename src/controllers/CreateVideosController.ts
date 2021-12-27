import { Request, Response } from "express";
import { CreateVideosService } from "../services/CreateVideosService";

export class CreateVideosController {
  async handle(request: Request, response: Response) {
    const { name, description, duration, category_id } = request.body;

    const service = new CreateVideosService();

    const result = await service.execute({
      name,
      description,
      category_id,
      duration,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
