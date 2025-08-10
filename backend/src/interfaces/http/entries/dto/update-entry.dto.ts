import z from "zod";

export const UpdateEntryDtoSchema = z.object({
    emocion: z.string().min(1).optional(),
    texto: z.string().min(1).optional(),
    }).refine(data => data.emocion || data.texto, {
        message: "Al menos un campo (emocion o texto) debe ser proporcionado",
    })

export type UpdateEntryDto = z.infer<typeof UpdateEntryDtoSchema>;