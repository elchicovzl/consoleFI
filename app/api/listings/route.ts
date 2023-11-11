import * as z from "zod";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { propertyFormSchema } from "@/app/dashboard/properties/data/schema";

type PropertyFormValues = z.infer<typeof propertyFormSchema>

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { 
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        price,
        address,
        code,
        parking,
        stratum,
        area,
        locationValue,
        imageMultipleSrc,
        floor,
        administration,
        typeListing,
        antique
       } = body;
    
      Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
          NextResponse.error();
        }
      });

      let imageMultiple = imageMultipleSrc.map((image:string) =>
        image.replace('http://','https://')
      );
    
      const listing = await prisma.listing.create({
        data: {
          title,
          description,
          imageSrc,
          category,
          roomCount,
          bathroomCount,
          guestCount,
          locationValue,
          price: parseInt(price, 10),
          address,
          code,
          parking,
          stratum,
          area,
          imageMultipleSrc: imageMultiple,
          floor,
          administration,
          typeListing,
          antique,
          userId: currentUser.id
        }
      });
    
      return NextResponse.json(listing);
}