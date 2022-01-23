import app from "./app";
import config from "./config";
import "reflect-metadata";
import "./database";

const port = config.port;

app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`);
});
