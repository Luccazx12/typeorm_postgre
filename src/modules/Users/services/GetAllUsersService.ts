import { getRepository } from "typeorm";
import { User } from "@modules/Users/infra/typeorm/entities/User";

export class GetAllUsersService {
    async execute() {
      const repo = await getRepository(User);
      const users = repo.find();
      return users;
    }
  }