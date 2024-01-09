import * as z from "zod";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { propertyFormSchema } from "@/app/dashboard/properties/data/schema";

type PropertyFormValues = z.infer<typeof propertyFormSchema>

export async function POST(request: Request, context: any) {

    const currentUser = await getCurrentUser();
  
      if (!currentUser) {
          return NextResponse.error();
      }
      
      console.log("publicando ando")

      const listing = await prisma.listing.update({
        where: {
          id: context.params.id,
        },
        data: {
            state:"Active",
        }
      });
  
      return NextResponse.json({});
}