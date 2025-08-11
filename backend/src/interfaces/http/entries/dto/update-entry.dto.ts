import z from "zod";

export const UpdateEntryDtoSchema = z.object({
    title: z.string().min(1).optional(),
    emocion: z.string().min(1).optional(),
    texto: z.string().min(1).optional(),
    }).refine(data => data.title || data.emocion || data.texto, {
        message: "Al menos un campo (titulo, emocion o texto) debe ser proporcionado",
    })

export type UpdateEntryDto = z.infer<typeof UpdateEntryDtoSchema>;