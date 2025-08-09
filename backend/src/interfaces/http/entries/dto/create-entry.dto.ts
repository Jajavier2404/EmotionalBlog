import { z } from "zod";

export const CreateEntryDtoSchema = z.object({
    emocion: z.string().min(1, "La emoción es requerida"), // zod para validar que la emoción no esté vací (minimo 1 carácter si no bota "La emoción es requerida")
    texto: z.string().min(1, "El texto es requerido"), // zod para validar que el texto del blog no esté vacío (mínimo 1 carácter si no bota "El texto es requerido")
})

export type CreateEntryDto = z.infer<typeof CreateEntryDtoSchema>;//exporta el resultado de la validación de zod a CreateEntryDtoSchema validando que el objeto cumpla con las reglas definidas en CreateEntryDtoSchema