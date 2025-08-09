import { z } from 'zod';

export const validationSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().optional().default('3000'),  // porque viene como string del env
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});
