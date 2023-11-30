import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import User from "../../models/user.model";

export class CreateUser {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email } = req.body;
      const newUser = await User.create({
        username,
        email,
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
