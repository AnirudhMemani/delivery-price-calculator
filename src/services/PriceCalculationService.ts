import { ResourceNotFoundError } from "../middlewares/GlobalErrorHandler.js";
import { getPrismaClient } from "../utils/prisma-client.js";

export class PriceCalculationService {
    static prisma = getPrismaClient();

    async calculateDeliveryPrice(
        zone: string,
        organizationId: number,
        totalDistance: number,
        itemType: "perishable" | "non-perishable"
    ) {
        const pricingData =
            await PriceCalculationService.prisma.pricing.findFirst({
                where: {
                    zone,
                    organization_id: organizationId,
                    item: { type: itemType },
                },
            });

        if (!pricingData) {
            new ResourceNotFoundError("Invalid pricing configuration");
        } else {
            const { base_distance_in_km, km_price, fix_price } = pricingData;

            const distanceBeyondBase = Math.max(
                0,
                totalDistance - base_distance_in_km
            );

            const extraDistanceCost = distanceBeyondBase * km_price;
            const totalDeliveryCost = fix_price + extraDistanceCost;

            return totalDeliveryCost;
        }
    }
}
