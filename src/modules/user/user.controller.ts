import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import User from "../../models/user.model";
import jwt from "jsonwebtoken";

export class CreateUser {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email } = req.body;
      const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "1h" });

      const newUser = await User.create({
        username,
        email,
        token,
      });

      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      if (
        error instanceof ValidationError &&
        error.errors[0]?.type === "unique violation"
      ) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      console.error("Error creating user:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export class GetAllUsers {
  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const allUsers = await User.findAll();

      return res.status(200).json({
        users: allUsers,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export class GetUser {
  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }
      return res.status(200).json({
        user: user,
      });
    } catch (error) {
      console.error("Error retrieving user:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export class EditUser {
  static async edit(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { username, email } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      if (!username || !email) {
        return res.status(400).json({
          message: "Username and email cannot be empty",
        });
      }
      await user.update({
        username,
        email,
      });
      return res.status(200).json({
        message: "Update User Success",
        user: user,
      });
    } catch (error) {
      if (
        error instanceof ValidationError &&
        error.errors[0]?.type === "unique violation"
      ) {
        return res.status(400).json({
          message: "Email already exists for another user",
        });
      }
      console.error("Error updating user:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export class DeleteUser {
  static async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      await user.destroy();
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
