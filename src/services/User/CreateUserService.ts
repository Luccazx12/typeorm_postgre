import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { Role } from "./../../entities/Role";
import { DateGmt } from "../../utils/DateGmt-3";

type UserRequest = {
  name: string;
  username: string;
  password: string;
  email: string;
  role_id: string;
};

export class CreateUserService {
  async execute({
    name,
    username,
    password,
    email,
    role_id,
  }: UserRequest): Promise<Error | User> {
    const userRepo = getRepository(User);
    const roleRepo = getRepository(Role);

    if (!(await roleRepo.findOne(role_id))) {
      return new Error("Role does not exists!");
    }

    if (
      (await userRepo.findOne({ where: { username: username } })) ||
      (await userRepo.findOne({ where: { email: email } }))
    ) {
      return new Error("User already exists!");
    }

    if (!name || !username || !password || !email || !role_id) {
      return new Error("Missing information");
    }

    const date = await DateGmt(new Date());

    const user = userRepo.create({
      name,
      username,
      password,
      email,
      role_id,
      actived: true,
      created_at: date,
      updated_at: date,
    });

    await userRepo.save(user);
    return user;
  }
}
