import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export class GetByUsernameService {
  async execute(username: string) {
    const repo = await getRepository(User);
    const user = await repo.findOne({ where: { username: username } });

    if (!user) {
      return new Error("User does not exists!");
    }

    return user;
  }
}
