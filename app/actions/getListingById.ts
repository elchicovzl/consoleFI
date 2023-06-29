import prisma from "libs/prismadb";
import ObjectID from "bson";


interface IParams {
  id: string;
}

export default async function getListingById(
  params: IParams
) {
    try {
        const { id } = params;
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")


        if(!checkForHexRegExp.test(id)) {
            return null;
        }

        const listing = await prisma.listing.findUnique({
        where: {
            id: id,
        },
        include: {
            user: true
        }
        });

        if (!listing) {
        return null;
        }

        return {
        ...listing,
        createdAt: listing.createdAt.toString(),
        user: {
            ...listing.user,
            createdAt: listing.user.createdAt.toString(),
            updatedAt: listing.user.updatedAt.toString(),
            emailVerified: 
            listing.user.emailVerified?.toString() || null,
        }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}