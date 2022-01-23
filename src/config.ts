import * as dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const keyJwt = process.env.JWT_KEY;
const port = process.env.PORT || 3002;

const config = { keyJwt: keyJwt, port: port };

export default config;
