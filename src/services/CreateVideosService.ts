import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Videos } from "../entities/Videos";

type VideosRequest = {
  name: string;
  description: string;
  duration: number;
  category_id: string;
};

export class CreateVideosService {
  async execute({
    name,
    description,
    duration,
    category_id,
  }: VideosRequest): Promise<Error | Videos> {
    const repo = getRepository(Videos);
    const repoCategory = getRepository(Category);

    if (!(await repoCategory.findOne(category_id))) {
      return new Error("Category does not exists!");
    }

    if (await repo.findOne({ where: { name: name } })) {
      return new Error("Video already exists!");
    }

    const video = repo.create({ name, description, duration, category_id });

    await repo.save(video);
    return video;
  }
}
