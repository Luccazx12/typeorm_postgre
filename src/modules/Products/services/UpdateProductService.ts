import { getRepository } from "typeorm";
import { Product } from "@modules/Products/infra/typeorm/entities/Product";
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

export class UpdateProductService {
  async execute({
    id,
    name,
    description,
    price,
    category_id,
    user_id,
    activated,
  }: ProductsRequest): Promise<Error | Product> {
    const repo = getRepository(Product);
    const product = await repo.findOne(id);

    if (!product) {
      return new Error("Product does not exist");
    } else {
      if (product.activated === activated && activated !== null) {
        if (activated === true) {
          return new Error("Product already activated");
        } else {
          return new Error("Product already desactivated");
        }
      } else {
        const date = await DateGmt(new Date());

        product.name = name ? name : product.name;
        product.description = description ? description : product.description;
        product.price = price ? price : product.price;
        product.category_id ? category_id : product.category_id;
        product.user_id ? user_id : product.user_id;
        product.updated_at = date;

        if (activated === null) {
          product.activated = product.activated;
        } else {
          product.activated = activated;
        }

        await repo.save(product);

        return product;
      }
    }
  }
}
