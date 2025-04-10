import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controllers.js"

const router = Router();
router.route("/").get(healthcheck); //home route

export default router
//go to app.js



