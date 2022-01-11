import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Role } from "../../entities/Role";
import { User } from "../../entities/User";
import { DateGmt } from "../../utils/DateGmt-3";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export default class InsertRolesAndAdminUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      const adminId = uuid();
      const date = await DateGmt(new Date());
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([
          {
            id: uuid(),
            name: "User",
            created_at: date,
            updated_at: date,
          },
          {
            id: adminId,
            name: "Admin",
            created_at: date,
            updated_at: date,
          },
        ])
        .execute();

      const password = await bcrypt.hashSync("1234", 10);
      await getRepository(User).save({
        id: uuid(),
        name: "Admin",
        username: "Admin",
        password: password,
        email: "mario-lucca@hotmail.com",
        role_id: adminId,
        actived: true,
        created_at: date,
        updated_at: date,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
