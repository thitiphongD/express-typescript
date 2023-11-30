import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import { healthCheckRoutes } from "./modules/healthcheck/healthcheck.route";
import { userRoutes } from "./modules/user/user.route";
import { sequelize } from "./configs/sequelize-config";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
    sequelize.sync({ force: false }).then(() => {
      console.log("Database and tables synced!");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initialize();

// Middleware
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

healthCheckRoutes(app);
userRoutes(app);

// Error recovery middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  next(err);
  res.status(500).send("Something went wrong!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    message: "404 Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
