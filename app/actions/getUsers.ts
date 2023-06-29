import prisma from "libs/prismadb";

export default async function getUsers() {
    try {
        
        const users = await prisma.user.findMany({
            orderBy: {
              createdAt: 'desc'
            }
        });

        const safeListings = users.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        }));

        return safeListings;

    } catch (error: any) {
        return null
    }
}