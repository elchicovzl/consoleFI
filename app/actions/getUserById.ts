import prisma from "libs/prismadb";

interface IParams {
  id: string;
}

export default async function getUserById(
  params: IParams
) {
    try {
        const { id } = params;
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$")


        if(!checkForHexRegExp.test(id)) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });

        if (!user) {
        return null;
        }

        return {
            ...user,
            createdAt: user.createdAt.toString(),
            updatedAt: user.updatedAt.toString(),
            emailVerified: user.emailVerified?.toString() || null,
        };
    } catch (error: any) {
        throw new Error(error);
    }
}