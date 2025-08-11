/**
 * Este archivo es el encargado de manejar la lógica de negocio para crear una nueva entrada.
 * En otras palabras aca creo la funcion que creara un nuevo blog
 */

import { Inject, Injectable } from "@nestjs/common";
import type { EntryRepository } from "../../domain/repositories/entry.repository";
import { Entry } from "../../domain/entities/entry.entity";
@Injectable()
export class CreateEntryUseCase {
  constructor(
    @Inject('EntryRepository') 
    private readonly entryRepository: EntryRepository) {}

  async execute(title: string, emocion: string, texto: string, userId: string): Promise<Entry> {
    const nuevaEntrada = await this.entryRepository.create({
        fecha:new Date(),
        title,
        emocion,
        texto,
        userId,
    })
    return nuevaEntrada;
  }
}