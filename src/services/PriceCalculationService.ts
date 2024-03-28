import { ResourceNotFoundError } from "../middlewares/GlobalErrorHandler.js";
import { getPrismaClient } from "../config/prisma-client.js";
import { convertCentsToEuros } from "../utils/constants.js";
import { IPricingModel } from "../models/pricing.js";

export class PriceCalculationService {
    static prisma = getPrismaClient();

    async calculateDeliveryPrice(
        zone: string,
        organizationId: number,
        totalDistance: number,
        itemType: "perishable" | "non-perishable"
    ): Promise<number> {
        const pricingData = await this.fetchPriceData(
            zone,
            organizationId,
            itemType
        );

        const { base_distance_in_km, km_price, fix_price } = pricingData;

        // if distance is greater than base distance this will return then distance beyond the base distance
        const distanceBeyondBase = Math.max(
            0,
            totalDistance - base_distance_in_km
        );

        const extraDistanceCost = distanceBeyondBase * km_price;
        const totalDeliveryCostInCents = fix_price + extraDistanceCost;

        // assuming price is stored in cents in the database
        const totalDeliveryCostInEuros = convertCentsToEuros(
            totalDeliveryCostInCents
        );

        return totalDeliveryCostInEuros;
    }

    async fetchPriceData(
        zone: string,
        organizationId: number,
        itemType: "perishable" | "non-perishable"
    ): Promise<IPricingModel> {
        const pricingData =
            await PriceCalculationService.prisma.pricing.findFirst({
                where: {
                    zone,
                    organization_id: organizationId,
                    item: { type: itemType },
                },
            });

        if (!pricingData) {
            new ResourceNotFoundError("Pricing data not available");
        }

        return pricingData!;
    }
}
