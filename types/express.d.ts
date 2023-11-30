import User from "../src/models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Replace 'User' with your actual user model type
  }
}
