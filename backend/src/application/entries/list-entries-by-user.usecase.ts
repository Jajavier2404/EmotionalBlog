/*
 * /-/-/ List entries by user use case /-/-/
 * Este archivo define el caso de uso ListEntriesByUserUseCase, que se encarga de listar
 * todas las entradas asociadas a un usuario específico.
 * 
 * Su función es recibir el ID del usuario y devolver un array de entradas
 * correspondientes a ese usuario, utilizando el repositorio de entradas.
 * 
 * Por lo que devuelve es una promesa que resuelve en un array de objetos Entry.
 * o sea todos los blogs posteados por el usuario. 
 */
import { Inject,Injectable } from "@nestjs/common";
import type { EntryRepository } from "src/domain/repositories/entry.repository";
import { Entry } from "src/domain/entities/entry.entity";

@Injectable()
export class ListEntriesByUserUseCase {
  constructor(
    @Inject('EntryRepository') 
    private readonly entryRepository: EntryRepository) {}

  async execute(userId: string): Promise<Entry[]> {
    return this.entryRepository.findByUserId(userId);
  }
}