import app from "./app";
import "@shared/infra/typeorm";
import { SwaggerAutoGen } from "../swagger/swagger-autogen";
const port = process.env.PORT;

app.listen(port, () => {
  if (process.env.NODE_ENV === "development") {
    new SwaggerAutoGen();
    console.log("API em modo de Desenvolvimento");
  }
  console.log(`Servidor rodando na porta: ${port}`);
});
