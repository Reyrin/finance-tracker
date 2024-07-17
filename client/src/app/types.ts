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

export const TransactionSchema = z.object({
  title: z.string().min(1).max(20).trim(),
  type: z.enum(["income", "expense"], {
    invalid_type_error: "Type is required",
  }),
  amount: z.coerce.number().int().positive().finite().lte(1000000000),
  category: z.string(),
});

export type LoginFormData = z.infer<typeof CredentialsSchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type CategoryEditFormData = z.infer<typeof CategorySchema> & {
  id: number;
};
export type TransactionFormData = z.infer<typeof TransactionSchema>;

export type KeyOfLoginInputs = keyof LoginFormData;

export type KeyOfColors = keyof typeof colors;

type TransactionType = "income" | "expense";

export interface User {
  id: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  title: string;
  color: KeyOfColors;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistics {
  totalIncome: number;
  totalExpense: number;
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
