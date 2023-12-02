import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  const token = authorizationHeader.replace(/^Bearer\s/, "");

  try {
    const decodedToken = jwt.verify(token, "your-secret-key") as {
      id: string;
    };
    // console.log("Decoded Token:", decodedToken);

    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      return res.status(403).json({ message: "Forbidden: Invalid token 2" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid token from catch error" });
  }
};
