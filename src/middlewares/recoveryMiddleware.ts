import { Request, Response, NextFunction } from "express";

const recoveryMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  next(err);
  return res.status(500).json({
    message: "Something went wrong!",
  });
};

export default recoveryMiddleware;
