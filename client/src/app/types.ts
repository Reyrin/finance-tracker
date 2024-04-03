import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginData = z.infer<typeof CredentialsSchema>;

export type KeyOfLoginInputs = keyof LoginData;

export interface UserData {
  id: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface LoginResponse {
  user: UserData;
  token: string;
}

export interface ErrorResponse {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
}
