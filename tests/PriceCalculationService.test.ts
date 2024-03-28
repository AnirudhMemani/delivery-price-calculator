import { ResourceNotFoundError } from "../src/middlewares/GlobalErrorHandler";
import { PriceCalculationService } from "../src/services/PriceCalculationService";

jest.mock("../src/config/prisma-client", () => {
    return {
        getPrismaClient: () => ({
            pricing: {
                findFirst: jest.fn().mockResolvedValue({
                    id: 1,
                    zone: "Central",
                    organization_id: 1,
                    item_id: 1,
                    base_distance_in_km: 5,
                    km_price: 150,
                    fix_price: 1000,
                }),
            },
        }),
    };
});

describe("PriceCalculationService", () => {
    it("should calculate delivery price correctly for Central Zone", async () => {
        const service = new PriceCalculationService();
        const price = await service.calculateDeliveryPrice(
            "Central",
            1,
            8,
            "perishable"
        );

        expect(price).toBe(17);
    });
    it("should calculate delivery price correctly for Central Zone", async () => {
        const service = new PriceCalculationService();
        const price = await service.calculateDeliveryPrice(
            "Northern",
            1,
            8,
            "non-perishable"
        );

        expect(price).toBe(21);
    });
    it("should calculate delivery price correctly for Central Zone", async () => {
        const service = new PriceCalculationService();
        const price = await service.calculateDeliveryPrice(
            "Central",
            1,
            0,
            "perishable"
        );

        expect(price).toBe(10);
    });
    it("should calculate delivery price correctly for Central Zone", async () => {
        const service = new PriceCalculationService();
        const price = await service.calculateDeliveryPrice(
            "Eastern",
            2,
            12,
            "perishable"
        );

        expect(price).toBe(24.1);
    });
    it("should calculate delivery price correctly for Central Zone", async () => {
        const service = new PriceCalculationService();
        const price = await service.calculateDeliveryPrice(
            "InvalidZone",
            1,
            5,
            "non-perishable"
        );

        expect(price).toBe(new ResourceNotFoundError());
    });
});
