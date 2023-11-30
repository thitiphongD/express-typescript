import { Request, Response, NextFunction } from "express";

const pageNotFoundMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(err);
  return res.status(404).json({
    message: "Page not found",
  });
};

export default pageNotFoundMiddleware;
