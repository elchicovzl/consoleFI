import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { Listing } from "@prisma/client";

export default async function getDashboardInfo() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return null;
        }

        const properties = await prisma.listing.findMany({
            orderBy: {
                id: 'desc',
            },
            take: 5,
        });
        const usersCount = await prisma.user.count();
        const propertiesCount = await prisma.listing.count();

        const safeProperties = properties.map((property:Listing) => ({
            ...property,
            createdAt: property.createdAt.toISOString(),
        }));

        return {
            safeProperties,
            usersCount,
            propertiesCount
        }
    }
    catch (error: any) {
        return null
    }
}