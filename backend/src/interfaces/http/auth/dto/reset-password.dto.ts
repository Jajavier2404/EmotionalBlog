import { z } from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres")
});
