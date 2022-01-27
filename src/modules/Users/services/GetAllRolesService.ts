import { getRepository } from "typeorm";
import { Role } from "@modules/Roles/infra/typeorm/entities/Role";

export class GetAllRolesService {
    async execute() {
      const repo = await getRepository(Role);
      const roles = repo.find();
      return roles;
    }
  }