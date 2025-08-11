/*
 * /-/-/ UpdateEntryUseCase /-/-/
 * 
 * Este archivo define el caso de uso UpdateEntryUseCase, que se encarga de actualizar 
 * una entrada existente.
 * 
 * Su funcion es recibir el ID de la entrada, los datos a actualizar y el ID del usuario,
 * y realizar la actualización a través del repositorio de entradas.
 */

import {Inject, Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import type { EntryRepository } from "src/domain/repositories/entry.repository";
import { Entry } from "src/domain/entities/entry.entity";

@Injectable()
export class UpdateEntryUseCase {
    constructor(
        @Inject('EntryRepository')
        private readonly entryRepository: EntryRepository
    ) {}
    async execute(id: string, datos: Partial<Pick<Entry, 'title' | 'emocion' | 'texto'>>, userId:string): Promise<Entry>{
        const entrada = await this.entryRepository.findById(id);
        if (!entrada) {
            throw new NotFoundException(`Blog con ID ${id} no encontrado`);
        }
        if (entrada.userId !== userId) {
            throw new ForbiddenException("No tienes permiso para actualizar esta entrada");
        }
        const entradaActualizada = await this.entryRepository.update(id, datos);
        return entradaActualizada;
    }
}