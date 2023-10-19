import { z } from "zod"
import { SafeUser } from "@/types";
import { User, Listing, Prisma } from "@prisma/client";

export type listingSchemaType = Prisma.ListingSelect

const Enum_StateListing = {
  Active: "Active",
  Pending: "Pending",
  Expired: "Expired",
  Sold: "Sold"
} as const

const states = z.nativeEnum(Enum_StateListing).nullish();

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  category: z.string().nullish(),
  roomCount: z.number().nullish(),
  guestCount: z.number().nullish(),
  locationValue: z.array(z.number()),
  imageMultipleSrc: z.array(z.string()),
  userId: z.string(),
  price: z.number(),
  state: states,
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  address: z.string(),
  code: z.string(),
  parking: z.number().nullish(),
  stratum: z.number().nullish(),
  area: z.number().nullish(),
  antique: z.string().nullish(),
  floor: z.number().nullish(),
  administration: z.number().nullish(),
  typeListing: z.string().nullish(),
})

export type Listings = z.infer<typeof listingSchema>

export const propertyFormSchema = z.object({
  title: z
  .string()
  .min(2, {
      message: "Titulo debe tener almenos dos caracteres.",
  }),
  code: z.string(),
  address: z.string(),
  price: z
  .coerce.number().min(1, {
      message: "El precio debe ser mayor a 0"
  }).default(1),
  administration: z
  .coerce.number().default(0).optional(),
  area: z
  .coerce.number().default(0).optional(),
  description: z.string().optional(),
  roomCount: z
  .coerce.number().default(0).optional(),
  bathroomCount: z
  .coerce.number().default(0).optional(),
  parking: z.coerce.number().default(0).optional(),
  floor: z.coerce.number().default(0).optional(),
  stratum: z.coerce.number().default(0).optional(),
  imageSrc: z.string().optional(),
  antique: z.string().optional(),
  imageMultipleSrc: z.array(z.string()).optional(),
  locationValue: z.array(z.number()).optional(),
  typeListing: z.string().optional(),
  state: z.string().optional()
});