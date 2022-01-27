const swaggerAutogen = require("swagger-autogen")();
const host = process.env.HOST;
const port = process.env.PORT;

export class SwaggerAutoGen {
  //   private outputFile: any = process.cwd() + "/src/swagger/swaggerTest.json";
  //   private endPointsFiles: any = [
  //     process.cwd() + "/src/routes/routes.ts",
  //     process.cwd() + "/src/routes/AuthRoutes.ts",
  //   ];

  async execute() {
    const outputFile = "./src/shared/infra/swagger/swagger.json";
    const endPointsFiles = [
      "./src/shared/infra/http/routes/AuthRoutes.ts",
      "./src/shared/infra/http/routes/routes.ts",
    ];

    const docs = {
      info: {
        title: "TypeOrm_Postgre API",
        description: "...",
      },
      host: `${host}:${port}`,
      schemes: ["http", "https"],
      tags: [
        {
          name: "Authenticated Routes",
          description: "Routes of Class Users",
          externalDocs: {
            description: "Find out more",
            url: "http://swagger.io",
          },
        },
        {
          name: "Users_auth",
          description: "Endpoints for adding pets to the directory",
        },
        {
          name: "Products_auth",
          description: "Endpoints for updating pet information",
        },
        {
          name: "Categories_auth",
          description: "Endpoints for getting information about pets",
        },
        {
          name: "Open Routes",
          description: "Routes of Class Users",
          externalDocs: {
            description: "Find out more",
            url: "http://swagger.io",
          },
        },
        {
          name: "Users",
          description: "Endpoints for adding pets to the directory",
        },
        {
          name: "Products",
          description: "Endpoints for updating pet information",
        },
        {
          name: "Categories",
          description: "Endpoints for getting information about pets",
        },
      ],
    };

    try {
      await swaggerAutogen(outputFile, endPointsFiles, docs);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

new SwaggerAutoGen().execute();