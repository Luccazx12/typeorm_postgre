import { getRepository } from "typeorm";
import { Role } from "../../entities/Role";

export class GetAllRolesService {
  async execute() {
    const repo = await getRepository(Role);
    const roles = repo.find();
    return roles;
  }
}
