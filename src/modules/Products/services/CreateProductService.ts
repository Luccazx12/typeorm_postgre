import { getRepository } from "typeorm";
import { Product } from "@modules/Products/infra/typeorm/entities/Product";
import { Category } from "@modules/Categories/infra/typeorm/entities/Category";
import { DateGmt } from "@shared/utils/DateGmt-3";

type ProductsRequest = {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
  activated: boolean;
};

export class CreateProductService {
    async execute({
      name,
      description,
      price,
      category_id,
      user_id,
    }: ProductsRequest): Promise<Error | Product> {
      const repo = getRepository(Product);
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
        activated: true,
        created_at: date,
        updated_at: date,
      });
  
      await repo.save(product);
      return product;
    }
  }