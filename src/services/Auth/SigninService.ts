import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class SigninService {
  async execute(email: string, password: string) {
    const repo = getRepository(User);
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
          email: user.email,
          role: user.role.name,
        },
        "teste",
        { expiresIn: 86400 }
      );
    }

    const success = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name,
      accessToken: token,
    };

    return success;
  }
}