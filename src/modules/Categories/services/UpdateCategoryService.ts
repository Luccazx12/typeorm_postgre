import { getRepository } from "typeorm";
import { Category } from "@modules/Categories/infra/typeorm/entities/Category";
import { DateGmt } from "@shared/utils/DateGmt-3";

type CategoryRequest = {
  id: string;
  name: string;
  description: string;
  defaultPrice: number;
  activated: boolean;
};

export class UpdateCategoryService {
    async execute({
      id,
      name,
      description,
      defaultPrice,
      activated,
    }: CategoryRequest) {
      const repo = getRepository(Category);
  
      const category = await repo.findOne(id);
  
      if (!category) {
        return new Error("Category does not exists!");
      }
  
      if (category.activated === activated && activated !== null) {
        if (activated === true) {
          return new Error("Product already activated");
        } else {
          return new Error("Product already desactivated");
        }
      } else {
        const date = await DateGmt(new Date());
  
        category.name = name ? name : category.name;
        category.description = description ? description : category.description;
        category.defaultPrice = defaultPrice
          ? defaultPrice
          : category.defaultPrice;
        category.updated_at = date;
  
        if (activated === null) {
          category.activated = category.activated;
        } else {
          category.activated = activated;
        }
  
        await repo.save(category);
  
        return category;
      }
    }
  }
  