import { getRepository } from "typeorm";
import { Like } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { DateGmt } from "../utils/DateGmt-3";

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
    } else if (!admin || !role_id) {
      const userRole = await roleRepo.findOne({
        where: {
          name: "User",
        },
      });
      role_id = userRole.id;
    }

    if (!(await roleRepo.findOne(role_id))) {
      return new Error("Role does not exists!");
    }

    username = username.toLowerCase();
    email = email.toLowerCase();

    if (await userRepo.findOne({ where: { username: username } })) {
      return new Error("Username already registred");
    } else if (await userRepo.findOne({ where: { email: email } })) {
      return new Error("Email already registred!");
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

export class SearchByUsernameService {
  async execute(username: string) {
    const repo = await getRepository(User);
    username = username.toLowerCase();
    const user = await repo.find({
      username: Like(`${username}%`),
    });

    if (!user) {
      return new Error("User does not exists!");
    }
    
    for(var i = 0; i < user.length; i++){
      delete user[i].password;
    }
    
    return user;
  }
}

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
    delete user.password; delete user.email;
    return user;
  }
}

export class GetAllUsersService {
  async execute() {
    const repo = await getRepository(User);
    const users = repo.find();
    return users;
  }
}

export class GetAllRolesService {
  async execute() {
    const repo = await getRepository(Role);
    const roles = repo.find();
    return roles;
  }
}