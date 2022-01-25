import { Request, Response } from "express";
import { SigninService } from "../services/AuthService";

export class SigninController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const service = new SigninService();
      const result = await service.execute(email, password);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
