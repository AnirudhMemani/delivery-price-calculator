import { ResourceNotFoundError } from "../middlewares/GlobalErrorHandler.js";
import { getPrismaClient } from "../config/prisma-client.js";
import { convertCentsToEuros } from "../utils/constants.js";

export class PriceCalculationService {
    static prisma = getPrismaClient();

    async calculateDeliveryPrice(
        zone: string,
        organizationId: number,
        totalDistance: number,
        itemType: "perishable" | "non-perishable"
    ) {
        const pricingData = await this.fetchPriceData(
            zone,
            organizationId,
            itemType
        );

        const { base_distance_in_km, km_price, fix_price } = pricingData!;

        const distanceBeyondBase = Math.max(
            0,
            totalDistance - base_distance_in_km
        );

        const extraDistanceCost = distanceBeyondBase * km_price;
        const totalDeliveryCostInCents = fix_price + extraDistanceCost;

        const totalDeliveryCostInEuros = convertCentsToEuros(
            totalDeliveryCostInCents
        );

        return totalDeliveryCostInEuros;
    }

    async fetchPriceData(
        zone: string,
        organizationId: number,
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
        }

        return pricingData;
    }
}
