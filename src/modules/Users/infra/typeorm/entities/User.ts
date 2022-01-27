import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { Length, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Role } from "@modules/Roles/infra/typeorm/entities/Role";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 80,
  })
  @Length(10, 80)
  name: string;

  @Column()
  username: string;
  //unique

  @Column({
    length: 100,
  })
  @Length(10, 100)
  @Exclude()
  password: string;

  @Column({
    length: 100,
  })
  @Length(10, 100)
  @IsEmail()
  email: string;
  //unique

  @Column({ default: true })
  activated: boolean;

  @Column()
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSaltSync();
    this.password = await bcrypt.hashSync(password || this.password, salt);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

// export const getRoleId = async () => {
//   const roles = await getRepository(Role).findOne({ where: { name: "Admin" } });
//   return roles.id;
// };

// export const userSchema = {
//   id: { type: "number", required: true, example: uuid() },
//   name: { type: "string", required: true, example: "Lucca" },
//   username: { type: "string", required: true, example: "luccazx12" },
//   password: { type: "string", required: true, example: "1234" },
//   email: { type: "string", required: true, example: "mario-lucca@hotmail.com" },
//   role_id: { type: "string", required: true, example: getRoleId() },
//   active: { type: "boolean", required: true, example: true },
// };
