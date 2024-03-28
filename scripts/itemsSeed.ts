import { getPrismaClient } from "../src/config/prisma-client.js";

const prisma = getPrismaClient();

async function populateItemsTable() {
    await prisma.item.createMany({
        data: [
            {
                type: "non-perishable",
                description: "Shoes",
            },
            {
                type: "non-perishable",
                description: "Shirt",
            },
            {
                type: "perishable",
                description: "Meat and Poultry",
            },
            {
                type: "non-perishable",
                description: "Trouser",
            },
            {
                type: "perishable",
                description: "Frozen Foods",
            },
            {
                type: "non-perishable",
                description: "Jacket",
            },
        ],
    });
}

populateItemsTable()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
