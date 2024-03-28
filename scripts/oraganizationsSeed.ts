import { getPrismaClient } from "../src/config/prisma-client.js";

const prisma = getPrismaClient();

async function populateOrganizationTable() {
    await prisma.organization.createMany({
        data: [
            {
                name: "Frostbite Fashions",
            },
            {
                name: "Prime Cuts Butchery & Frozen",
            },
            {
                name: "Stylish Slacks & Outerwear Boutique",
            },
        ],
    });
}

populateOrganizationTable()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
