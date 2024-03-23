import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInputs = z.infer<typeof schemaLogin>;

export type KeyOfLoginInputs = keyof LoginInputs;