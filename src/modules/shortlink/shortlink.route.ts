import { Express } from "express";
import { ShortLink } from "./shortlink.controller";
import { authenticate } from "../../middlewares/auth.middleware";

export const shortLinkRoutes = (app: Express) => {
  app.post("/short", authenticate, ShortLink.short);
};
