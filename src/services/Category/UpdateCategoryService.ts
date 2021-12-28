import { getRepository } from "typeorm";
import { Category } from "../../entities/Category";
import { DateGmt } from "../../utils/DateGmt-3";

type CategoryUpdateRequest = {
  id: string;
  name: string;
  description: string;
  defaultPrice: number;
  actived: boolean;
};

export class UpdateCategoryService {
  async execute({
    id,
    name,
    description,
    defaultPrice,
    actived,
  }: CategoryUpdateRequest) {
    const repo = getRepository(Category);

    const category = await repo.findOne(id);

    if (!category) {
      return new Error("Category does not exists!");
    }

    const date = await DateGmt(new Date());

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;
    category.defaultPrice = defaultPrice ? defaultPrice : category.defaultPrice;
    category.updated_at = date;

    if (actived === null) {
      category.actived = category.actived;
    } else {
      category.actived = actived;
    }

    await repo.save(category);

    return category;
  }
}
