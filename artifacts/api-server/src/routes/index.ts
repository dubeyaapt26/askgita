import { Router, type IRouter } from "express";
import healthRouter from "./health";
import gitaRouter from "./gita";
import gitaContentRouter from "./gita-content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gitaRouter);
router.use(gitaContentRouter);

export default router;
