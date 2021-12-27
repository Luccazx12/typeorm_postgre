import { getRepository } from "typeorm";
import { Videos } from "../entities/Videos";

export class GetAllVideosServices {
  async execute() {
    const repo = getRepository(Videos);

    const videos = await repo.find({
      relations: ["category"],
    });

    return videos;
  }
}
