import { getRepository } from "typeorm";
import config from "@config/auth";
import { User } from "@modules/Users/infra/typeorm/entities/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class SigninService {
  async execute(email: string, password: string) {
    const repo = getRepository(User);
    email = email.toLowerCase();

    const user = await repo.findOne({
      where: { email: email },
      relations: ["role"],
    });

    if (!email || !password) {
      return new Error("Missing Information");
    } else if (!user) {
      return new Error("Email/password combination is incorrect");
    } else if (!(await bcrypt.compareSync(password, user.password))) {
      return new Error("Email/password combination is incorrect");
    } else {
      var token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role.name,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );
    }

    const success = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      token: token,
    };

    return success;
  }
}
