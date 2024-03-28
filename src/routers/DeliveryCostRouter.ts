import { Router } from "express";
import { getTotalDeliveryCost } from "../controllers/DeliveryCostController.js";

const router = Router();

router.post("/delivery-cost", getTotalDeliveryCost);

export default router;
