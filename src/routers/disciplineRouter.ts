import { Router } from "express";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import disciplineController from "../controllers/disciplineController.js";

const disciplineRouter = Router();

disciplineRouter.get(
  "/disciplines",
  ensureAuthenticatedMiddleware,
  disciplineController.findMany
);

export default disciplineRouter;