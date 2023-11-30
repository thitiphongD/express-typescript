import { Express } from "express";
import {
  CreateUser,
  GetAllUsers,
  GetUser,
  EditUser,
  DeleteUser,
} from "./user.controller";

export const userRoutes = (app: Express) => {
  app.get("/users", GetAllUsers.show);
  app.get("/user/:id", GetUser.show);
  app.post("/create", CreateUser.create);
  app.put("/user/:id", EditUser.edit);
  app.delete("/user/:id", DeleteUser.destroy);
};
