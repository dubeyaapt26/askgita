import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import gitaRouter from "./gita.js";
import gitaContentRouter from "./gita-content.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gitaRouter);
router.use(gitaContentRouter);

export default router;
