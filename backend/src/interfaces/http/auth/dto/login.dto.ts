import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
