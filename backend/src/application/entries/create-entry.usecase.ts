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
    @Inject('EntryRepository') // Asegúrate de que el token coincida con el proporcionado en tu módulo
    private readonly entryRepository: EntryRepository) {}

  async execute(emocion: string, texto: string, userId: string): Promise<Entry> {
    const nuevaEntrada = await this.entryRepository.create({
        fecha:new Date(),
        emocion,
        texto,
        userId,
    })
    return nuevaEntrada;
  }
}