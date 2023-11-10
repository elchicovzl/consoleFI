import * as z from "zod";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { userFormEditSchema } from "@/app/dashboard/users/data/schema";
import bcrypt from "bcrypt";

type UserFormValues = z.infer<typeof userFormEditSchema>

export async function PUT(request: Request, context: any) {

    const currentUser = await getCurrentUser();
  
      if (!currentUser) {
          return NextResponse.error();
      }
  
      const body = await request.json();

      const {
        email,
        name,
        password
      } = body;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.update({
        where: {
          id: context.params.id,
        },
        data: {
          email,
          name,
          hashedPassword
        }
      });
  
      return NextResponse.json({});
}