import { Express } from "express";
import { HealthCheck } from "./healthcheck.controller";

export const healthCheckRoutes = (app: Express) => {
  app.get("/check", HealthCheck.say);
};
