import { Express } from "express";
import { CreateShortLink, GetAllLinks, GetLink } from "./shortlink.controller";
import { authenticate } from "../../middlewares/auth.middleware";

export const shortLinkRoutes = (app: Express) => {
  app.get("/links", GetAllLinks.show);
  app.get("/link/:id", GetLink.show);
  app.post("/short", authenticate, CreateShortLink.short);
};
