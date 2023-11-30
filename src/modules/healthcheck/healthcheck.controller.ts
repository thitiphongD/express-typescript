import { Request, Response } from "express";

export class HealthCheck {
  static say(req: Request, res: Response): Response {
    return res.status(200).json({
      message: "Hello, Health Check!",
    });
  }
}
