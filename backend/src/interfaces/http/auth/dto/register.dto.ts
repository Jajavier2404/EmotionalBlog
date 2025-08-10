// src/interfaces/http/auth/dto/register.dto.ts
import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener mínimo 3 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
