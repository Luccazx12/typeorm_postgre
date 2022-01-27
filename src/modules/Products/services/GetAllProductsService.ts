import { getRepository } from "typeorm";
import { Product } from "@modules/Products/infra/typeorm/entities/Product";

export class GetAllProductsService {
  async execute() {
    const repo = getRepository(Product);
    const products = await repo.find({
      relations: ["category", "user"],
    });

    return products;
  }
}
