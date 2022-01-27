import { getRepository } from "typeorm";
import { User } from "@modules/Users/infra/typeorm/entities/User";

export class GetByUsernameService {
    async execute(username: string) {
      const repo = await getRepository(User);
      username = username.toLowerCase();
      const user = await repo.findOne({
        where: {
          username: username
        }
      });
  
      if (!user) {
        return new Error("User does not exists!");
      }
      delete user.password; 
      delete user.email;
      return user;
    }
  }