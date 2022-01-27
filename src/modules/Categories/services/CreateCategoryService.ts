import { getRepository } from "typeorm";
import { Category } from "@modules/Categories/infra/typeorm/entities/Category";
import { DateGmt } from "@shared/utils/DateGmt-3";
import { UpdateCategoryService } from "@modules/Categories/services/UpdateCategoryService";

type CategoryRequest = {
  id: string;
  name: string;
  description: string;
  defaultPrice: number;
  activated: boolean;
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
    if (await repo.findOne({ where: { name: name, activated: true } })) {
      return new Error("Category already exists");
    }
    // Se ele encontrar uma categoria que já existe e está desabilitada, ele atualiza
    // as informações daquela categoria e habilita ela.
    else if (await repo.findOne({ where: { name: name, activated: false } })) {
      const lastCategory = await repo.findOne({ where: { name: name } });
      const service = new UpdateCategoryService();
      const result = await service.execute({
        id: lastCategory.id,
        name,
        description,
        defaultPrice,
        activated: true,
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
        activated: true,
        created_at: date,
        updated_at: date,
      });
      await repo.save(category);
      return category;
    }
  }
}
