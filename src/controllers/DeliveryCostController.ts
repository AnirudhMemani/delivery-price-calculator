import expressAsyncHandler from "express-async-handler";
import { BadRequestException } from "../middlewares/GlobalErrorHandler.js";
import z from "zod";
import { PriceCalculationService } from "../services/PriceCalculationService.js";

const deliveryCostRequestSchema = z.object({
    zone: z.string(),
    organization_id: z.number(),
    total_distance: z.number(),
    item_type: z.enum(["perishable", "non-perishable"]),
});

export const getTotalDeliveryCost = expressAsyncHandler(async (req, res) => {
    const parsedInput = deliveryCostRequestSchema.safeParse(req.body);

    if (!parsedInput.success) {
        console.log("zod validation ERROR:", parsedInput.error);
        new BadRequestException("Invalid Request Body!");
    } else {
        const { zone, organization_id, total_distance, item_type } =
            parsedInput.data;

        const priceCalculationService = new PriceCalculationService();

        const price = await priceCalculationService.calculateDeliveryPrice(
            zone,
            organization_id,
            total_distance,
            item_type
        );

        res.status(200).json({
            total_price: price,
        });
    }
});
