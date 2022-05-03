import { Router } from "express";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import teacherController from "../controllers/teacherController.js";

const teacherRouter = Router();

teacherRouter.get(
  "/discipline/:id/teachers",
  ensureAuthenticatedMiddleware,
  teacherController.findByDiscipline
);
teacherRouter.get('/teachers', ensureAuthenticatedMiddleware, teacherController.findMany)

export default teacherRouter;