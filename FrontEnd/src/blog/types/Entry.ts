export type Entry = {
  id: string;
  title: string;
  fecha: Date;
  emocion: string;
  texto: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type CreateEntryDto = {
    title: string;
    emocion: string;
    texto: string;
};

export type UpdateEntryDto = {
    title?: string;
    emocion?: string;
    texto?: string;
};
