import { z } from "zod";
import { colors } from "./constants";

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CategorySchema = z.object({
  title: z.string().min(1).max(20).trim(),
  color: z.string(),
});

export type LoginFormData = z.infer<typeof CredentialsSchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type CategoryEditFormData = z.infer<typeof CategorySchema> & {
  id: number;
};

export type KeyOfLoginInputs = keyof LoginFormData;

export interface User {
  id: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  title: string;
  color: keyof typeof colors;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
}
