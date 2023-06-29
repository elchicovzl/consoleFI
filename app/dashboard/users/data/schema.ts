import { z } from "zod"
import { SafeUser } from "@/types";
import { User } from "@prisma/client";


// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.date(),
  emailVerified: z.date().nullish(),
})

export type Task = z.infer<typeof taskSchema>

export const userFormSchema = z.object({
  name: z.string().min(3),
  email: z
    .string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.string()
  
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"]
});

export const userFormEditSchema = z.object({
  name: z.string().min(3),
  email: z
    .string().email(),
  password: z.string().min(6).optional(),
  confirmPassword: z.string().min(6).optional(),
  role: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"]
});
