require("dotenv/config");

const devConfig = [
  {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    seeds: ["./src/shared/infra/typeorm/seeders/*.ts"],
    factories: ["./src/shared/infra/typeorm/factories/*.ts"],
    cli: {
      migrationsDir: "./src/shared/infra/typeorm/migrations",
    },
  },
];

const prodConfig = [
  {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ["./dist/modules/**/infra/typeorm/entities/*.js"],
    migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
    cli: {
      migrationsDir: "./dist/shared/infra/typeorm/migrations",
    },
  },
];

module.exports = process.env.NODE_ENV === "development" ? devConfig : prodConfig;