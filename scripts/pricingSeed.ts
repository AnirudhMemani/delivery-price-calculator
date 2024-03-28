import { getPrismaClient } from "../src/config/prisma-client.js";

const prisma = getPrismaClient();

async function populatePricingTable() {
    await prisma.pricing.create({
        data: {
            zone: "Central",
            organization: { connect: { id: 1 } },
            item: { connect: { id: 1 } },
            base_distance_in_km: 5,
            km_price: 150,
            fix_price: 1000,
        },
    });
    await prisma.pricing.create({
        data: {
            zone: "Northern",
            organization: { connect: { id: 1 } },
            item: { connect: { id: 2 } },
            base_distance_in_km: 5,
            km_price: 200,
            fix_price: 1000,
        },
    });
    await prisma.pricing.create({
        data: {
            zone: "Southern",
            organization: { connect: { id: 2 } },
            item: { connect: { id: 3 } },
            base_distance_in_km: 5,
            km_price: 200,
            fix_price: 1000,
        },
    });
    await prisma.pricing.create({
        data: {
            zone: "Eastern",
            organization: { connect: { id: 2 } },
            item: { connect: { id: 5 } },
            base_distance_in_km: 5,
            km_price: 130,
            fix_price: 1000,
        },
    });
    await prisma.pricing.create({
        data: {
            zone: "Western",
            organization: { connect: { id: 3 } },
            item: { connect: { id: 4 } },
            base_distance_in_km: 5,
            km_price: 130,
            fix_price: 1000,
        },
    });
    await prisma.pricing.create({
        data: {
            zone: "Central",
            organization: { connect: { id: 3 } },
            item: { connect: { id: 6 } },
            base_distance_in_km: 5,
            km_price: 170,
            fix_price: 1000,
        },
    });
}

populatePricingTable()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
