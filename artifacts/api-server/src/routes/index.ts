import { Router, type IRouter } from "express";
import healthRouter from "./health";
import gitaContentRouter from "./gita-content";

const router: IRouter = Router();

router.use(healthRouter);
router.use(gitaContentRouter);

export default router;
