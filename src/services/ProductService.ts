import { getRepository } from "typeorm";
import { Products } from "../entities/Product";
import { Category } from "../entities/Category";
import { DateGmt } from "../utils/DateGmt-3";

export class GetAllProductsService {
  async execute() {
    const repo = getRepository(Products);

    const products = await repo.find({
      relations: ["category", "user"],
    });

    return products;
  }
}

type ProductsRequest = {
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
};

export class CreateProductService {
  async execute({
    name,
    description,
    price,
    category_id,
    user_id,
  }: ProductsRequest): Promise<Error | Products> {
    const repo = getRepository(Products);
    const repoCategory = getRepository(Category);

    if (!(await repoCategory.findOne(category_id))) {
      return new Error("Category does not exists!");
    }

    if (await repo.findOne({ where: { name: name } })) {
      return new Error("Product already exists!");
    }

    const date = await DateGmt(new Date());

    const product = repo.create({
      name,
      description,
      price,
      category_id,
      user_id,
      actived: true,
      created_at: date,
      updated_at: date,
    });

    await repo.save(product);
    return product;
  }
}

