import { Express } from "express";
import { ShortLink } from "./shortlink.controller";

export const shortLinkRoutes = (app: Express) => {
  app.post("/short", ShortLink.short);
};
