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
  admin: boolean;
};

export class CreateUserService {
  async execute({
    name,
    username,
    password,
    email,
    role_id,
    admin,
  }: UserRequest): Promise<Error | User> {
    const userRepo = getRepository(User);
    const roleRepo = getRepository(Role);


    if (!name || !username || !password || !email) {
      return new Error("Missing information");
    }
    else if (admin){
      if (!(await roleRepo.findOne(role_id))) {
        return new Error("Role does not exists!");
      }
    }
    else {
      const userRole = await roleRepo.findOne({
        where: {
          name: "User"
        }
      });

      role_id = userRole.id;
      console.log("hmmm")
    }

    if (
      (await userRepo.findOne({ where: { username: username } })) ||
      (await userRepo.findOne({ where: { email: email } }))
    ) {
      return new Error("User already exists!");
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
