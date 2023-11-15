import pg from "pg";
import "./dotenv.js";
const config = {
  user: "postgres",
  password: "*BC32dDaAca245eg2FfA5**A16fCE*f*",
  host: "viaduct.proxy.rlwy.net",
  port: 31077,
  database: "railway",
};

export const pool = new pg.Pool(config);
