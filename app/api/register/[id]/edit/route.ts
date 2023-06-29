import * as z from "zod";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userFormEditSchema } from "@/app/dashboard/users/data/schema";

type UserFormValues = z.infer<typeof userFormEditSchema>

export async function PUT(request: Request, context: any) {

    const currentUser = await getCurrentUser();
  
      if (!currentUser) {
          return NextResponse.error();
      }
  
      const body = await request.json();

      const user = await prisma.user.update({
        where: {
          id: context.params.id,
        },
        data: body
      });
  
      return NextResponse.json({});
}