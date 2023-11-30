import { Sequelize } from "sequelize";
import { config } from "dotenv";

config(); // Load environment variables from .env

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

if (!dbName || !dbUser || !dbPassword || !dbHost) {
  throw new Error("One or more required environment variables are missing.");
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export { sequelize };
