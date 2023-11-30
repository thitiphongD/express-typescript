import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  try {
    const decodedToken = jwt.verify(token as string, "your-secret-key") as {
      userId: string;
    };
    console.log("Decoded Token:", decodedToken);

    const user = await User.findOne({ where: { id: decodedToken.userId } });

    if (!user) {
      return res.status(403).json({ message: "Forbidden: Invalid token 2" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    console.log("Provided Token:", token);
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid token from catch error" });
  }
};
