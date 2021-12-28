import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";
import { DateGmt } from "../../utils/DateGmt-3";

export default class InsertSeeders implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      const date = await DateGmt(new Date());
      await connection
        .createQueryBuilder()
        .insert()
        .into("seeders")
        .values([
          {
            id: uuid(),
            name: "CreateRolesAndAdminUser",
            created_at: date,
            updated_at: date,
          },
        ])
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
