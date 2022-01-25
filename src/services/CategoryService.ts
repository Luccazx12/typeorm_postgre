import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { DateGmt } from "../utils/DateGmt-3";

export class GetAllCategoriesService {
  async execute() {
    const repo = getRepository(Category);
    const categories = await repo.find();
    return categories;
  }
}

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

type CategoryRequest = {
  name: string;
  description: string;
  defaultPrice: number;
};

export class CreateCategoryService {
  async execute({
    name,
    description,
    defaultPrice,
  }: CategoryRequest): Promise<Category | Error> {
    const repo = getRepository(Category);
    // Se ele encontrar uma categoria já existente e que está ativa, então ele retorna que aquela
    // categoria já existe, para não haver duplicações.
    if (await repo.findOne({ where: { name: name, actived: true } })) {
      return new Error("Category already exists");
    }
    // Se ele encontrar uma categoria que já existe e está desabilitada, ele atualiza
    // as informações daquela categoria e habilita ela.
    else if (await repo.findOne({ where: { name: name, actived: false } })) {
      const lastCategory = await repo.findOne({ where: { name: name } });
      const service = new UpdateCategoryService();
      const result = await service.execute({
        id: lastCategory.id,
        name,
        description,
        defaultPrice,
        actived: true,
      });
      return result;
    }
    // Se não encontrar categorias duplicadas, faz o insert normalmente.
    else {
      const date = await DateGmt(new Date());

      const category = repo.create({
        name,
        description,
        defaultPrice,
        actived: true,
        created_at: date,
        updated_at: date,
      });
      await repo.save(category);
      return category;
    }
  }
}

export class DeleteCategoryService {
  async execute(id: string) {
    const repo = getRepository(Category);

    if (!(await repo.findOne(id))) {
      return new Error("Category does not exists!");
    }

    await repo.delete(id);
  }
}
