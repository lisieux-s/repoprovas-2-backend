import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);
testRouter.get('/test/view/:id', ensureAuthenticatedMiddleware, testController.incrementViews)
testRouter.post('/tests/create', ensureAuthenticatedMiddleware, testController.create)
export default testRouter;
