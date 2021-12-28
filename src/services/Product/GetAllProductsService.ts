import { getRepository } from "typeorm";
import { Products } from "../../entities/Product";

export class GetAllProductsService {
  async execute() {
    const repo = getRepository(Products);

    const products = await repo.find({
      relations: ["category", "user"],
    });

    return products;
  }
}
