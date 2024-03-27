import { Router } from "express";
import { calculateDeliveryCost } from "../controllers/DeliveryCostController.js";

const router = Router();

router.get("/delivery-cost", calculateDeliveryCost);

export default router;
